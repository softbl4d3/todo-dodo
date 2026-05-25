import { Button } from '../atoms/Button';

type BulkActionsProps = {
  total: number;
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: (selected: boolean) => void;
  onCompleteSelected: () => void;
};

export function BulkActions({ total, selectedCount, allSelected, onSelectAll, onCompleteSelected }: BulkActionsProps) {
  return (
    <div className="flex flex-col gap-2 p-2">
      <label className="flex items-center gap-3">
        <input
          checked={allSelected && total > 0}
          className="h-4 w-4"
          disabled={total === 0}
          type="checkbox"
          onChange={(event) => onSelectAll(event.target.checked)}
        />
        Select all visible tasks
      </label>

      <Button disabled={selectedCount === 0} type="button" variant="secondary" onClick={onCompleteSelected}>
        Mark selected done ({selectedCount})
      </Button>
    </div>
  );
}
