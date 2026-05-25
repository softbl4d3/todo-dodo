import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../categories/categories.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';

const MAX_TODOS_PER_CATEGORY = 5;

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepository: TodosRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  createTodo(createTodoDto: CreateTodoDto) {
    const category = this.categoriesRepository.getCategoryById(createTodoDto.categoryId);

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const todosCount = this.todosRepository.countTodosByCategoryId(createTodoDto.categoryId);

    if (todosCount >= MAX_TODOS_PER_CATEGORY) {
      throw new BadRequestException('Category already has maximum 5 active todos');
    }

    return this.todosRepository.createTodo(createTodoDto);
  }

  getTodos(categoryId?: number) {
    return this.todosRepository.getTodos(categoryId);
  }

  updateCompleted(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todosRepository.getTodoById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return this.todosRepository.updateCompleted(id, updateTodoDto.completed);
  }

  deleteTodo(id: number) {
    const todo = this.todosRepository.getTodoById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    this.todosRepository.deleteTodo(id);
  }
}
