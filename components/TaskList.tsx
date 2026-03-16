import { Task } from "@/types/Task";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Checkbox, IconButton, Typography } from "@mui/material";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

/** タスクリスト */
export const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggleCompleted,
}: Props) => {
  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleCompleted(task.id)}
            />
            <Typography
              className={task.completed ? "line-through text-gray-500" : ""}
            >
              {task.title}
            </Typography>
          </div>
          <div>
            <IconButton onClick={() => onEdit(task)} className="text-blue-500!">
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => onDelete(task.id)}
              className="text-red-500!"
            >
              <DeleteOutline />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
};
