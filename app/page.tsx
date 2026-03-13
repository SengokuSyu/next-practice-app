"use client";

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { supabase } from "@/lib/supabase";
import { Task } from "@/types/Task";
import { Avatar, Button, Card, Typography } from "@mui/material";
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
  }, [authChecked, router, user]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setTasks(data);
    };
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
    <main className="min-h-screen bg-slate-200 px-10 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">タスク一覧</h1>

        <div className="flex items-center gap-3">
          <span className="text-slate-600">
            {user?.user_metadata?.name ?? "User"}
          </span>

          <Avatar />

          {/* あとでアバターアイコン内のダイアログに移動 */}
          <Button onClick={logout} variant="outlined" size="small">
            ログアウト
          </Button>
        </div>
      </div>

      <Card className="p-8 !rounded-[24px]">
        <div className="flex justify-between items-center mb-6">
          <Typography className="text-xl font-semibold">
            タスク{tasks.length}/{tasks.length}
          </Typography>
          <TaskForm
            onAdd={addTask}
            onUpdate={updateTask}
            editingTask={editingTask}
          />
        </div>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onEdit={startEdit} onDelete={deleteTask} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Typography className="text-lg">まだタスクがありません</Typography>
            <Typography className="text-sm">
              新しいタスクを追加してください
            </Typography>
          </div>
        )}
      </Card>
    </main>
  );
}
