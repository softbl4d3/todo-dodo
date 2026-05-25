import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { Spinner } from '../components/atoms/Spinner';
import { CategoryForm } from '../components/organisms/CategoryForm';
import { CategoryFilter } from '../components/organisms/CategoryFilter';
import { TodoForm } from '../components/organisms/TodoForm';
import { TodoList } from '../components/organisms/TodoList';
import { UndoToast } from '../components/organisms/UndoToast';
import { createCategory, createTodo, deleteTodo, getApiErrorMessage, getCategories, getTodos, updateTodoStatus } from '../lib/api';
import type { Category, CreateCategoryInput, CreateTodoInput, Todo } from '../types';

type ToastState = {
  message: string;
  undo: () => void;
};

export function TodosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [pendingIds, setPendingIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [categoryError, setCategoryError] = useState<string>();
  const [toast, setToast] = useState<ToastState>();
  const timers = useRef(new Map<number, number>());

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(undefined);

      try {
        const [categoriesData, todosData] = await Promise.all([getCategories(), getTodos(selectedCategoryId)]);

        if (active) {
          setCategories(categoriesData);
          setTodos(todosData);
        }
      } catch (requestError) {
        if (active) {
          setError(getApiErrorMessage(requestError));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      active = false;
    };
  }, [selectedCategoryId]);

  useEffect(() => {
    const activeTimers = timers.current;

    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  async function handleCreate(input: CreateTodoInput) {
    setFormLoading(true);
    setFormError(undefined);

    try {
      const todo = await createTodo(input);

      if (!selectedCategoryId || selectedCategoryId === todo.categoryId) {
        setTodos((current) => [todo, ...current]);
      }
    } catch (requestError) {
      setFormError(getApiErrorMessage(requestError));
      throw requestError;
    } finally {
      setFormLoading(false);
    }
  }

  async function handleCreateCategory(input: CreateCategoryInput) {
    setCategoryLoading(true);
    setCategoryError(undefined);

    try {
      const category = await createCategory(input);
      setCategories((current) => [...current, category]);
    } catch (requestError) {
      setCategoryError(getApiErrorMessage(requestError));
      throw requestError;
    } finally {
      setCategoryLoading(false);
    }
  }

  function clearPending(id: number) {
    const timer = timers.current.get(id);

    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }

    setPendingIds((current) => current.filter((pendingId) => pendingId !== id));
  }

  function scheduleRemoval(todo: Todo, message: string, undo: () => Promise<void>) {
    clearPending(todo.id);
    setPendingIds((current) => [...current, todo.id]);

    const timer = window.setTimeout(() => {
      void deleteTodo(todo.id).catch((requestError) => setError(getApiErrorMessage(requestError)));
      timers.current.delete(todo.id);
      setPendingIds((current) => current.filter((pendingId) => pendingId !== todo.id));
      setSelectedIds((current) => current.filter((selectedId) => selectedId !== todo.id));
      setTodos((current) => current.filter((currentTodo) => currentTodo.id !== todo.id));
      setToast(undefined);
    }, 5000);

    timers.current.set(todo.id, timer);
    setToast({
      message,
      undo: () => {
        clearPending(todo.id);
        setToast(undefined);
        void undo().catch((requestError) => setError(getApiErrorMessage(requestError)));
      },
    });
  }

  async function handleComplete(todo: Todo) {
    try {
      const updatedTodo = await updateTodoStatus(todo.id, true);
      setTodos((current) => current.map((item) => (item.id === todo.id ? updatedTodo : item)));

      scheduleRemoval(updatedTodo, 'Task marked done. It will disappear soon.', async () => {
        const restoredTodo = await updateTodoStatus(todo.id, false);
        setTodos((current) => current.map((item) => (item.id === todo.id ? restoredTodo : item)));
      });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  function handleDelete(todo: Todo) {
    setTodos((current) => current.filter((item) => item.id !== todo.id));
    setSelectedIds((current) => current.filter((id) => id !== todo.id));

    scheduleRemoval(todo, 'Task deleted.', async () => {
      setTodos((current) => [todo, ...current]);
    });
  }

  function handleSelect(id: number, selected: boolean) {
    setSelectedIds((current) => (selected ? [...current, id] : current.filter((selectedId) => selectedId !== id)));
  }

  function handleSelectAll(selected: boolean) {
    const visibleIds = todos.map((todo) => todo.id);
    setSelectedIds((current) => {
      if (selected) {
        return Array.from(new Set([...current, ...visibleIds]));
      }

      return current.filter((id) => !visibleIds.includes(id));
    });
  }

  function handleCompleteSelected() {
    const selectedTodos = todos.filter((todo) => selectedIds.includes(todo.id) && !todo.completed && !pendingIds.includes(todo.id));
    selectedTodos.forEach((todo) => void handleComplete(todo));
  }

  return (
    <main className="p-4">
      <div className="grid gap-4">
        <section className="grid gap-4">
          <Card>
            <p>Todo with categories</p>
            <h1>Tasks</h1>
            <p>
              Create categories, add tasks, filter by category, and undo delete or completed actions.
            </p>
          </Card>

          <CategoryForm apiError={categoryError} isSubmitting={categoryLoading} onCreate={handleCreateCategory} />
          <TodoForm apiError={formError} categories={categories} isSubmitting={formLoading} onCreate={handleCreate} />
        </section>

        <section className="grid gap-4">
          <Card>
            <div className="mb-4 flex flex-col gap-2">
              <div>
                <p>Current list</p>
                <h2>Todos</h2>
              </div>
              <CategoryFilter categories={categories} selectedCategoryId={selectedCategoryId} onChange={setSelectedCategoryId} />
            </div>

            {error ? (
              <div className="mb-4 grid gap-2 p-2">
                {error}
                <Button type="button" variant="secondary" onClick={() => window.location.reload()}>
                  Reload
                </Button>
              </div>
            ) : null}

            {loading ? (
              <Spinner />
            ) : (
              <TodoList
                categories={categories}
                pendingIds={pendingIds}
                selectedIds={selectedIds}
                todos={todos}
                onComplete={handleComplete}
                onCompleteSelected={handleCompleteSelected}
                onDelete={handleDelete}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
              />
            )}
          </Card>
        </section>
      </div>

      {toast ? <UndoToast message={toast.message} onUndo={toast.undo} /> : null}
    </main>
  );
}
