import { useForm } from 'react-hook-form';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Input } from '../atoms/Input';
import type { CreateCategoryInput } from '../../types';

type FormValues = {
  name: string;
};

type CategoryFormProps = {
  isSubmitting: boolean;
  apiError?: string;
  onCreate: (category: CreateCategoryInput) => Promise<void>;
};

export function CategoryForm({ isSubmitting, apiError, onCreate }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: '' } });

  async function submit(values: FormValues) {
    try {
      await onCreate({ name: values.name.trim() });
      reset();
    } catch {
      return;
    }
  }

  return (
    <Card>
      <div className="mb-4">
        <h2>Create category</h2>
        <p>Add a category, then use it in the task form.</p>
      </div>

      <form className="grid gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          label="Category name"
          placeholder="Work"
          error={errors.name?.message}
          {...register('name', {
            required: 'Category name is required',
            maxLength: { value: 40, message: 'Category name is too long' },
            validate: (value) => value.trim().length > 0 || 'Category name is required',
          })}
        />

        {apiError ? <div className="px-2 py-2">{apiError}</div> : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add category'}
        </Button>
      </form>
    </Card>
  );
}
