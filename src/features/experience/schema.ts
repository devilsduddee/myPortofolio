import { z } from 'zod';

export const ExperienceSchema = z.object({
  companyName: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional()
});

export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;