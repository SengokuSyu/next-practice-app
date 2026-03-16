import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "タスク名は必須です"),
  description: z.string(),
  type: z.array(z.string()).default([]),
});

export type TaskBase = z.input<typeof taskSchema>;

export const editTaskSchema = taskSchema.extend({
  id: z.string(),
});

export type EditTask = z.input<typeof editTaskSchema>;
