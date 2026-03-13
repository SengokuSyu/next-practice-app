import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "タスク名は必須です"),
  description: z.string(),
  type: z.array(z.string().optional()),
});

export type TaskBase = z.infer<typeof taskSchema>;
