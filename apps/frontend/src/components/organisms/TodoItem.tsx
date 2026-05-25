import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import type { Category, Todo } from '../../types';

type TodoItemProps = {
  todo: Todo;
  category?: Category;
  selected: boolean;
  pending: boolean;
  onSelect: (id: number, selected: boolean) => void;
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export function TodoItem({ todo, category, selected, pending, onSelect, onComplete, onDelete }: TodoItemProps) {
  return (
    <li className="ui-list-item grid gap-3 p-4">
      <div className="flex items-start gap-3">
        <input
          aria-label={`Select ${todo.text}`}
          checked={selected}
          className="mt-1 h-4 w-4"
          type="checkbox"
          onChange={(event) => onSelect(todo.id, event.target.checked)}
        />

        <button
          aria-label={`Mark ${todo.text} as done`}
          className="mt-1 flex h-4 w-4 items-center justify-center"
          disabled={pending || todo.completed}
          type="button"
          onClick={() => onComplete(todo)}
        >
          {todo.completed ? '✓' : ''}
        </button>

        <div className="flex-1">
          <p>{todo.text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{category?.name ?? `Category ${todo.categoryId}`}</Badge>
            <Badge tone={todo.completed ? 'done' : 'draft'}>{todo.completed ? 'done' : 'not done'}</Badge>
            {pending ? <Badge tone="draft">undo window</Badge> : null}
          </div>
        </div>

        <Button disabled={pending} type="button" variant="danger" onClick={() => onDelete(todo)}>
          Delete
        </Button>
      </div>
    </li>
  );
}
