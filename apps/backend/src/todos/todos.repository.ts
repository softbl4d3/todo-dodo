import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../database/database.provider';
import { todos } from '../database/schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  createTodo(createTodoDto: CreateTodoDto) {
    return this.db
      .insert(todos)
      .values({
        text: createTodoDto.text,
        categoryId: createTodoDto.categoryId,
        completed: false,
      })
      .returning()
      .get();
  }

  getTodos(categoryId?: number) {
    if (categoryId) {
      return this.db.select().from(todos).where(eq(todos.categoryId, categoryId)).all();
    }

    return this.db.select().from(todos).all();
  }

  getTodoById(id: number) {
    return this.db.select().from(todos).where(eq(todos.id, id)).get();
  }

  countTodosByCategoryId(categoryId: number) {
    const row = this.db
      .select({ value: sql<number>`count(*)` })
      .from(todos)
      .where(eq(todos.categoryId, categoryId))
      .get();

    return row?.value ?? 0;
  }

  updateCompleted(id: number, completed: boolean) {
    return this.db
      .update(todos)
      .set({ completed })
      .where(eq(todos.id, id))
      .returning()
      .get();
  }

  deleteTodo(id: number) {
    this.db.delete(todos).where(eq(todos.id, id)).run();
  }
}
