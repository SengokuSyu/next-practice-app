"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email });

    alert("メールを確認してください！");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <input
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginPage;