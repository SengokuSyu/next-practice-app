"use client";

import { supabase } from "@/lib/supabase";
import { LoginInput, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <Card className="w-[480px] shadow-xl !rounded-[12px]">
        <CardContent className="gap-6 flex flex-col justify-center">
          <div className="flex flex-col gap-1">
            {/* icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-500 text-white p-3 rounded-full">
                <MailOutline />
              </div>
            </div>

            {/* title */}
            <Typography variant="h5" align="center" className="font-bold !mb-2">
              タスク管理アプリ
            </Typography>
            <Typography align="center" className="text-gray-500 mb-6">
              メールアドレスとパスワードを入力してログインしてください
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <Typography className="mb-2 text-sm font-medium">
                メールアドレス
              </Typography>
              <TextField
                fullWidth
                {...register("email")}
                placeholder="example@example.com"
              />
              {errors.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )}
            </div>

            <div className="mb-4">
              <Typography className="mb-2 text-sm font-medium">
                パスワード
              </Typography>
              <TextField
                fullWidth
                type="password"
                {...register("password")}
                placeholder="パスワードを入力"
              />
              {errors.password && (
                <Typography color="error">{errors.password.message}</Typography>
              )}
            </div>

            <div>
              {isLoginError && (
                <Typography color="error" className="text-sm">
                  メールアドレスかパスワードが間違っています
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="!x-366 !y-20 !bg-indigo-500 !text-white !mb-4 !py-2 !px-4"
            >
              ログイン
            </Button>
            <Typography align="center" className="text-sm text-black-500 mt-6">
              アカウントをお持ちでない方は{" "}
              <Link
                href="/signup"
                className="text-[var(--color-indigo-600)] font-medium"
              >
                サインイン
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
