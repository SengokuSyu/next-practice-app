"use client";

import { supabase } from "@/lib/supabase";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.com"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワードを入力"
        sx={{ backgroundColor: "white" }}
      />
      <Button
        variant="contained"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        ログイン
      </Button>
      <div>
        <span>アカウントをお持ちでない方は</span>
        <Link href="/signup" className="text-[var(--color-indigo-600)]">
          サインイン
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
