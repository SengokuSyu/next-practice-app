import { Task } from "@/types/Task";

type Props = {
    tasks: Task[],
    onEdit: (task: Task) => void,
    onDelete: (id: string) => void
}

/** タスクリスト */
export const TaskList = ({ tasks,onEdit, onDelete }: Props) => {
    return (
        <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
                <li 
                key={task.id} 
                className="flex justify-between border p-2 rounded"
                >
                    <span>{task.title}</span>
                    <button
              onClick={() => onEdit(task)}
              className="text-blue-500"
            >
              edit
            </button>
                    <button 
                        onClick={() => onDelete(task.id)}
                        className="text-red-500"
                    >
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
}