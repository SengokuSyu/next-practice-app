import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "名前は必須です"),
    email: z.email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上必要です"),
    passwordReconfirm: z.string().min(8, "パスワード確認は8文字以上必要です"),
  })
  .refine((data) => data.password === data.passwordReconfirm, {
    message: "パスワードと確認用パスワードが一致しません",
    path: ["passwordReconfirm"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
