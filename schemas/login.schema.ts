import z from "zod";

export const loginSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

export type LoginInput = z.infer<typeof loginSchema>;
