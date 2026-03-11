"use client";

import { supabase } from "@/lib/supabase";
import { SignupInput, signupSchema } from "@/schemas/singin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });
    console.log("userData", userData);
    console.log("error", error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>アカウント作成</p>
      <p>新しいアカウントを作成してタスク管理を始めましょう</p>
      <div>
        <TextField {...register("name")} placeholder="山田太郎" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <TextField {...register("email")} placeholder="example@example.com" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <TextField
          type="password"
          {...register("password")}
          placeholder="パスワードを入力"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <TextField
          type="password"
          {...register("passwordReconfirm")}
          placeholder="パスワードを再入力"
        />
        {errors.passwordReconfirm && <p>{errors.passwordReconfirm.message}</p>}
      </div>

      <Button type="submit" variant="contained">
        Sign up
      </Button>
      <div>
        <span>ログインは</span>
        <Link href="/login" className="text-[var(--color-indigo-600)]">
          こちら
        </Link>
      </div>
    </form>
  );
};

export default SignupPage;
