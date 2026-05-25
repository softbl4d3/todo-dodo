import { Button } from '../atoms/Button';

type UndoToastProps = {
  message: string;
  onUndo: () => void;
};

export function UndoToast({ message, onUndo }: UndoToastProps) {
  return (
    <div className="ui-toast fixed bottom-4 left-0 p-4">
      <div className="flex items-center justify-between gap-4">
        <p>{message}</p>
        <Button className="shrink-0" type="button" variant="secondary" onClick={onUndo}>
          Undo
        </Button>
      </div>
    </div>
  );
}
