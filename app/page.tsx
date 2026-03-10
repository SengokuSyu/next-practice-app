"use client";

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { supabase } from "@/lib/supabase";
import { Task } from "@/types/Task";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setAuthChecked(true);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!user) {
      router.push("/login");
    }
  }, [authChecked, user]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    const { data } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }])
      .select();

    if (data) {
      setTasks((prev) => [...data, ...prev]);
    }
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
  };

  const updateTask = async (title: string) => {
    if (!editingTask) return;

    const { data } = await supabase
      .from("tasks")
      .update({ title })
      .eq("id", editingTask.id)
      .select();

    if (data) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? data[0] : task)),
      );
    }

    setEditingTask(null);
  };

  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!authChecked && !user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
      />

      <TaskList tasks={tasks} onEdit={startEdit} onDelete={deleteTask} />
    </main>
  );
}
