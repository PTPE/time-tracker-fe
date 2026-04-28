import z from "zod";

export type TimerStatus = "idle" | "running" | "paused";

export type StartTimerParams = {
  projectId: string;
  startedAt: number;
};

export type PauseTimerParams = {
  projectId: string;
  pausedAt: number;
};

export type StopTimerParams = {
  projectId: string;
  finishedAt: number;
  completedLength: number;
  notes?: string;
};

export type ResumeTimerParams = {
  projectId: string;
  resumedAt: number;
};

export type WorkLog = {
  id: string;
  projectName: string;
  userId: string;
  projectId: string;
  startedAt: number;
  finishedAt: number | null;
  actualDuration: number | null;
  pauseDuration: number;
  completedLength: number | null;
  notes: string | null;
  createdAt: number;
  updatedAt: number | null;
  pausedAt: number | null;
  status: "active" | "completed";
};

export const completeWorklog = z.object({
  finishedAt: z.number(),
  completedLength: z.number().positive("Must be greater than 0"),
  notes: z.string().optional(),
});
