"use client";

import { Task } from "@/types/Task";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
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
    //TODO: 回避コードの修正
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(editingTask?.title ?? "");
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
      <TextField
        color="primary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        sx={{ backgroundColor: "white" }}
      />
      <Button
        startIcon={<Add />}
        variant="contained"
        size="small"
        className="bg-blue-500 text-white px-3 py-2 rounded"
        type="submit"
      >
        {editingTask ? "更新" : "タスクを追加"}
      </Button>
    </form>
  );
};
