import { Task } from "@/types/Task";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

/** タスクリスト */
export const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between border p-2 rounded">
          <Typography>{task.title}</Typography>
          <div>
              <Button
                startIcon={<Edit />}
                onClick={() => onEdit(task)}
                className="text-blue-500"
              />
              <Button
                startIcon={<DeleteOutline />}
                onClick={() => onDelete(task.id)}
                className="text-red-500"
              />
          </div>
        </li>
      ))}
    </ul>
  );
};
