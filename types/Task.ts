/**
 *  タスク単体の型
 */
export type Task = {
  id: string;
  title: string;
  description: string;
  type: (string | undefined)[];
  status: Status;
  date: Date;
  created_at: string;
};

export type TaskBase = {
  title: string;
  description: string;
  type: string[];
  status: Status;
  date: Date;
};

export type Status = "waiting" | "working" | "completed" | "pending";