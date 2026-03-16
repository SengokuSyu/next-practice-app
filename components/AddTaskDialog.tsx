import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { TaskForm } from "./AddTaskForm";
import { TaskBase } from "@/schemas/task.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (task: TaskBase) => void;
};

export const AddTaskDialog = ({ open, onClose, onAdd }: Props) => {
  const handleAdd = (task: TaskBase) => {
    onAdd(task);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">新しいタスクを追加</h2>
            <p className="text-gray-500">
              追加するタスクの名前を入力してください
            </p>
          </div>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <TaskForm onAdd={handleAdd} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
