"use client";

import { supabase } from "@/lib/supabase";
import { LoginInput, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  const onSubmit = async (data: LoginInput) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setIsLoginError(true);
      return;
    }
    setIsLoginError(false);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>タスク管理アプリ</p>
      <p>メールアドレスとパスワードを入力してログインしてください</p>
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
        {isLoginError && <p>メールアドレスかパスワードが間違っています</p>}
      </div>
      <Button type="submit" variant="contained">
        ログイン
      </Button>
      <div>
        <span>アカウントをお持ちでない方は</span>
        <Link href="/signup" className="text-[var(--color-indigo-600)]">
          サインイン
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
