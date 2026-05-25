import { EmptyState } from '../atoms/EmptyState';
import { BulkActions } from './BulkActions';
import { TodoItem } from './TodoItem';
import type { Category, Todo } from '../../types';

type TodoListProps = {
  todos: Todo[];
  categories: Category[];
  selectedIds: number[];
  pendingIds: number[];
  onSelect: (id: number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onComplete: (todo: Todo) => void;
  onCompleteSelected: () => void;
  onDelete: (todo: Todo) => void;
};

export function TodoList({
  todos,
  categories,
  selectedIds,
  pendingIds,
  onSelect,
  onSelectAll,
  onComplete,
  onCompleteSelected,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  const selectedVisibleCount = todos.filter((todo) => selectedIds.includes(todo.id)).length;
  const allSelected = todos.every((todo) => selectedIds.includes(todo.id));

  return (
    <div className="grid gap-3">
      <BulkActions
        allSelected={allSelected}
        selectedCount={selectedVisibleCount}
        total={todos.length}
        onCompleteSelected={onCompleteSelected}
        onSelectAll={onSelectAll}
      />

      <ul className="grid gap-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            category={categories.find((category) => category.id === todo.categoryId)}
            pending={pendingIds.includes(todo.id)}
            selected={selectedIds.includes(todo.id)}
            todo={todo}
            onComplete={onComplete}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
