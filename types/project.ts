import z from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  totalDuration: z
    .number({ error: "Duration is required" })
    .min(0.1, "Duration must be greater than 0"),
  episodeCount: z.number(),
  totalFee: z
    .number({ error: "Fee is required" })
    .min(1, "Fee must be greater than 0")
    .multipleOf(0.01, "Fee must have at most 2 decimal places"),
  expectedHourlyRate: z
    .number({ error: "Hourly rate is required" })
    .min(1, "Hourly rate must be greater than 0")
    .multipleOf(0.01, "Hourly rate must have at most 2 decimal places"),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  description: z.string().optional(),
});

export type CreateProjectParams = z.infer<typeof projectSchema>;

export type ResGetProjects = Project[];

export type ResGetProject = Project;

export type Project = {
  name: string;
  totalDuration: number;
  episodeCount: number;
  totalFee: number;
  expectedHourlyRate: number;
  startDate: string;
  endDate: string;
  description: string;
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number | null;
};
