"use client";

import { editTaskSchema, EditTask } from "@/schemas/task.schema";
import { Task } from "@/types/Task";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  task: Task;
  onEdit: (task: EditTask) => void;
  onClose: () => void;
};
/** タスク入力フォーム */
export const EditTaskForm = ({ task, onEdit, onClose }: Props) => {
  const normalizeType = (type: (string | undefined)[] | undefined) =>
    type?.filter(Boolean).map(String) ?? [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTask>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      type: normalizeType(task.type),
    },
  });

  useEffect(() => {
    reset({
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      type: normalizeType(task.type),
    });
  }, [task, reset]);

  const onSubmit = (data: EditTask) => {
    onEdit(data);

    reset({
      title: "",
      description: "",
      type: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4"
    >
      <input type="hidden" {...register("id")} />
      <Typography>タスク名</Typography>
      <TextField
        {...register("title")}
        placeholder="タスク名"
        sx={{ backgroundColor: "white" }}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Typography>備考</Typography>
      <TextField
        {...register("description")}
        placeholder="備考"
        error={!!errors.description}
        helperText={errors.description?.message}
      ></TextField>
      <Typography>タイプ</Typography>
      <div className="flex gap-4 flex-wrap">
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            const currentValues = field.value ?? [];
            const toggle = (value: string) => {
              const next = currentValues.includes(value)
                ? currentValues.filter((v: string) => v !== value)
                : [...currentValues, value];
              field.onChange(next);
            };

            return (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentValues.includes("1")}
                      onChange={() => toggle("1")}
                    />
                  }
                  label="仕事"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentValues.includes("2")}
                      onChange={() => toggle("2")}
                    />
                  }
                  label="個人"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentValues.includes("3")}
                      onChange={() => toggle("3")}
                    />
                  }
                  label="緊急"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentValues.includes("4")}
                      onChange={() => toggle("4")}
                    />
                  }
                  label="重要"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentValues.includes("5")}
                      onChange={() => toggle("5")}
                    />
                  }
                  label="その他"
                />
              </>
            );
          }}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="outlined"
          onClick={onClose}
          className="px-6 rounded-xl"
        >
          キャンセル
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "12px",
            paddingX: "24px",
            background: "linear-gradient(90deg,#6366f1,#4f46e5)",
          }}
        >
          更新
        </Button>
      </div>
    </form>
  );
};
