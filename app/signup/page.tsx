"use client";

import { supabase } from "@/lib/supabase";
import { SignupInput, signupSchema } from "@/schemas/singin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonAddAlt } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
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
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <Card className="w-120 shadow-xl rounded-xl!">
        <CardContent className="p-10 gap-6 flex flex-col justify-center">
          <div className="flex flex-col gap-1">
            {/* icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-500 text-white p-3 rounded-full">
                <PersonAddAlt />
              </div>
            </div>

            {/* title */}
            <Typography variant="h5" align="center" className="font-bold mb-2!">
              アカウント作成
            </Typography>
            <Typography align="center" className="text-gray-500 mb-6">
              新しいアカウントを作成してタスク管理を始めましょう
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <Typography className="mb-2 text-sm font-medium">
                ユーザーネーム
              </Typography>
              <TextField
                fullWidth
                {...register("name")}
                placeholder="山田太郎"
              />
              {errors.name && (
                <Typography color="error">{errors.name.message}</Typography>
              )}
            </div>
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
            <div className="mb-4">
              <Typography className="mb-2 text-sm font-medium">
                パスワード（確認）
              </Typography>
              <TextField
                fullWidth
                type="password"
                {...register("passwordReconfirm")}
                placeholder="パスワードを再入力"
              />
              {errors.passwordReconfirm && (
                <Typography color="error">
                  {errors.passwordReconfirm.message}
                </Typography>
              )}
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="!x-366 !y-20 bg-indigo-500! text-white! mb-4! py-2! px-4!"
            >
              アカウントを作成
            </Button>
            <Typography align="center" className="text-sm text-black-500 mt-6">
              ログインは{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-medium"
              >
                こちら
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
