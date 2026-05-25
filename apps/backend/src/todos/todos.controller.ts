import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosQueryDto } from './dto/get-todos-query.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  getTodos(@Query() query: GetTodosQueryDto) {
    return this.todosService.getTodos(query.categoryId);
  }

  @Patch(':id')
  updateCompleted(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateCompleted(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: number) {
    this.todosService.deleteTodo(id);
  }
}
