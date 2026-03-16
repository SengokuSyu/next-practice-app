"use client";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Task } from "@/types/Task";
import { EditTaskForm } from "./EditTaskForm";
import { EditTask } from "@/schemas/task.schema";

type Props = {
  task: Task;
  open: boolean;
  onClose: () => void;
  onEdit: (task: EditTask) => void;
};

export const EditTaskDialog = ({ task, open, onClose, onEdit }: Props) => {
  const handleEdit = (updatedTask: EditTask) => {
    onEdit(updatedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{task.title}</h2>
            <p className="text-gray-500">タスクの内容を編集してください</p>
          </div>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <EditTaskForm task={task} onEdit={handleEdit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
