import { z } from 'zod';

export const AchievementSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  certificateUrl: z.string().optional()
});

export type AchievementFormValues = z.infer<typeof AchievementSchema>;