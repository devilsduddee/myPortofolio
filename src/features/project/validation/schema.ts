import { z } from 'zod';

export const ProjectSchema = z.object({
  projectName: z.string().optional(),
  description: z.string().optional(),
  techStack: z.string().optional(),
  role: z.string().optional(),
  imageUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  repositoryUrl: z.string().optional()
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;