import axios, { AxiosError } from 'axios';
import type { Category, CreateCategoryInput, CreateTodoInput, Todo } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
});

export async function getCategories() {
  const { data } = await api.get<Category[]>('/categories');
  return data;
}

export async function createCategory(input: CreateCategoryInput) {
  const { data } = await api.post<Category>('/categories', input);
  return data;
}

export async function getTodos(categoryId?: number) {
  const { data } = await api.get<Todo[]>('/todos', {
    params: categoryId ? { categoryId } : undefined,
  });
  return data;
}

export async function createTodo(input: CreateTodoInput) {
  const { data } = await api.post<Todo>('/todos', input);
  return data;
}

export async function updateTodoStatus(id: number, completed: boolean) {
  const { data } = await api.patch<Todo>(`/todos/${id}`, { completed });
  return data;
}

export async function deleteTodo(id: number) {
  await api.delete(`/todos/${id}`);
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const response = error.response?.data as { message?: string | string[] } | undefined;
    const message = response?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return message ?? error.message;
  }

  return 'Something went wrong';
}
