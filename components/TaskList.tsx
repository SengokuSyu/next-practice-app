import { Task } from "@/types/Task";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

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
}: Props) => {
  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div className="flex items-center gap-2">
            <Typography>{task.title}</Typography>
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
