"use client";

import { Task } from "@/types/Task";
import { SyntheticEvent, useEffect, useState } from "react";

type Props = {
  onAdd: (title: string) => void;
  onUpdate: (title: string) => void;
  editingTask: Task | null;
};
/** タスク入力フォーム */
export const TaskForm = ({ onAdd, onUpdate, editingTask }: Props) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    }
  }, [editingTask]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTask) {
      onUpdate(title);
    } else {
      onAdd(title);
    }

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap=-2">
      <input
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded"
        type="submit"
      >
        {editingTask ? "Update" : "Add"}
      </button>
    </form>
  );
};
