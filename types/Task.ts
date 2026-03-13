/**
 *  タスク単体の型
 */
export type Task = {
  id: string;
  title: string;
  description: string;
  type: number[];
  completed: boolean;
  created_at: string;
};

export type TaskBase = {
  title: string;
  description: string;
  type: string[];
};
