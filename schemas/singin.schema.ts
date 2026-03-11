import z from "zod";

export const signupSchema = z.object({
  email: z.string().email("メールアドレスの形式が正しくありません"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

export type SignupInput = z.infer<typeof signupSchema>;
