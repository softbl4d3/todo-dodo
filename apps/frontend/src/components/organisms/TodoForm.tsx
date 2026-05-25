import { useForm } from 'react-hook-form';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import type { Category, CreateTodoInput } from '../../types';

type FormValues = {
  text: string;
  categoryId: string;
};

type TodoFormProps = {
  categories: Category[];
  isSubmitting: boolean;
  apiError?: string;
  onCreate: (todo: CreateTodoInput) => Promise<void>;
};

export function TodoForm({ categories, isSubmitting, apiError, onCreate }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { text: '', categoryId: '' } });

  async function submit(values: FormValues) {
    try {
      await onCreate({ text: values.text.trim(), categoryId: Number(values.categoryId) });
      reset();
    } catch {
      return;
    }
  }

  return (
    <Card>
      <div className="mb-4">
        <h2>Create task</h2>
        <p>A category can contain no more than five tasks.</p>

        <form className="mt-4 grid gap-2" onSubmit={handleSubmit(submit)}>
          <Input
            label="Task text"
            placeholder="Buy coffee, finish layout..."
            error={errors.text?.message}
            {...register('text', {
              required: 'Task text is required',
              validate: (value) => value.trim().length > 0 || 'Task text is required',
            })}
          />

          <Select
            label="Category"
            error={errors.categoryId?.message}
            {...register('categoryId', { required: 'Choose a category' })}
          >
            <option value="">Choose category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          {apiError ? <div className="px-2 py-2">{apiError}</div> : null}

          <Button type="submit" disabled={isSubmitting || categories.length === 0}>
            {isSubmitting ? 'Saving...' : 'Add task'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
