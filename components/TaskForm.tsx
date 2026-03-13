"use client";

import { TaskBase, taskSchema } from "@/schemas/task.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

type Props = {
  onAdd: (task: TaskBase) => void;
  onClose: () => void;
};
/** タスク入力フォーム */
export const TaskForm = ({ onAdd, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskBase>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      type: [],
    },
  });

  const onSubmit = (data: TaskBase) => {
    onAdd(data);

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
        <FormControlLabel
          control={
            <Checkbox
              {...register("type", { valueAsNumber: true })}
              value={1}
            />
          }
          label="仕事"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("type", { valueAsNumber: true })}
              value={2}
            />
          }
          label="個人"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("type", { valueAsNumber: true })}
              value={3}
            />
          }
          label="緊急"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("type", { valueAsNumber: true })}
              value={4}
            />
          }
          label="重要"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("type", { valueAsNumber: true })}
              value={5}
            />
          }
          label="その他"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="outlined"
          onClick={onClose}
          className="px-[24px] rounded-[12px]"
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
          追加
        </Button>
      </div>
    </form>
  );
};
