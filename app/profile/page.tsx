"use client";

import { ArrowBack, Email, Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="page-background px-8 py-12">
      <div className="flex flex-col max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push("/")}
            variant="outlined"
            className="normal-case rounded px-3 py-5 shadow-lg bg-white! border-slate-300! text-slate-900! font-semibold"
          >
            タスク一覧に戻る
          </Button>
        </div>

        <Card className="rounded-xl p-4">
          <CardContent>
            <Typography variant="h5" className="text-2xl font-bold mb-2">
              プロフィール
            </Typography>

            <Stack spacing={2} className="mb-4">
              <div className="flex items-center gap-2 p-4 rounded bg-slate-50">
                <Avatar className="bg-indigo-600!">
                  <Person />
                </Avatar>
                <div>
                  <Typography
                    variant="caption"
                    className="text-xs text-slate-500"
                  >
                    ユーザー名
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="text-base font-bold"
                  >
                    {user?.user_metadata?.name ?? "-"}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 rounded bg-slate-50">
                <Avatar className="bg-blue-500!">
                  <Email />
                </Avatar>
                <div>
                  <Typography
                    variant="caption"
                    className="text-xs text-slate-500"
                  >
                    メールアドレス
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="text-base font-bold"
                  >
                    {user?.email ?? "-"}
                  </Typography>
                </div>
              </div>
            </Stack>

            <Button
              startIcon={<Logout />}
              fullWidth
              onClick={logout}
              className="flex items-center justify-center gap-2 w-full rounded-2xl border border-red-200 bg-white px-6 py-4 text-red-600! font-semibold shadow-sm hover:bg-red-50! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              ログアウト
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
