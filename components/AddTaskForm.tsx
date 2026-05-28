"use client";

import { TaskBase, taskSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type Props = {
  userId: string;
  onAdd: (task: TaskBase) => void;
  onClose: () => void;
};
/** タスク入力フォーム */
export const TaskForm = ({ userId, onAdd, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TaskBase>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      type: [],
      userId: userId,
    },
  });

  const onSubmit = (data: TaskBase) => {
    onAdd(data);

    reset({
      title: "",
      description: "",
      type: [],
      userId: userId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
      <Typography>タスク名</Typography>
      <TextField
        className="bg-white w-auto"
        {...register("title")}
        placeholder="タスク名"
        error={!!errors.title}
        helperText={errors.title?.message}
      ></TextField>

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
      <div>
        <FormControl>
          <Typography>ステータス</Typography>
          <RadioGroup className="ml-4">
            <FormControlLabel
              control={<Radio {...register("status")} value="waiting" />}
              label={"未着手"}
            />
            <FormControlLabel
              control={<Radio {...register("status")} value="working" />}
              label={"着手中"}
            />
            <FormControlLabel
              control={<Radio {...register("status")} value="pending" />}
              label={"完了"}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Typography>期限</Typography>
        {/* <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="日付を選択"
              className="border p-2 rounded-md w-full"
            />
          )}
        /> */}
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
          追加
        </Button>
      </div>
    </form>
  );
};
