import { Select } from '../atoms/Select';
import type { Category } from '../../types';

type CategoryFilterProps = {
  categories: Category[];
  selectedCategoryId: number | undefined;
  onChange: (categoryId: number | undefined) => void;
};

export function CategoryFilter({ categories, selectedCategoryId, onChange }: CategoryFilterProps) {
  return (
    <div className="w-full">
      <Select
        label="Filter by category"
        value={selectedCategoryId?.toString() ?? 'all'}
        onChange={(event) => onChange(event.target.value === 'all' ? undefined : Number(event.target.value))}
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
