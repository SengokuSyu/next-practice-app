"use client"

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { Task } from "@/types/Task";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  };

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Task Manager
      </h1>

      <TaskForm onAdd={addTask} />

      <TaskList tasks={tasks} onDelete={deleteTask} />
    </main>
  );
}
