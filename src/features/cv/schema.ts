import { z } from 'zod';

export const CvSchema = z.object({
  fileUrl: z.string().optional()
});

export type CvFormValues = z.infer<typeof CvSchema>;