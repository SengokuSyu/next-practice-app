import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: Timestamp;
};
