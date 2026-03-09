import { Task } from "@/types/Task";

type Props = {
    tasks: Task[],
    onDelete: (id: string) => void
}

export const TaskList = ({ tasks, onDelete }: Props) => {
    return (
        <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
                <li 
                key={task.id} 
                className="flex justify-between border p-2 rounded"
                >
                    <span>{task.title}</span>
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