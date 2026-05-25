export type Category = {
  id: number;
  name: string;
  createdAt: string;
};

export type Todo = {
  id: number;
  text: string;
  categoryId: number;
  completed: boolean;
  createdAt: string;
};

export type CreateTodoInput = {
  text: string;
  categoryId: number;
};

export type CreateCategoryInput = {
  name: string;
};
