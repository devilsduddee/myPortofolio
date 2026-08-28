import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Professional title is required'),
  tagline: z.string().min(5, 'Tagline is required for the hero section'),
  aboutMe: z.string().min(10, 'About Me description is too short'),
  avatarUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;

export const ExperienceSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  techStack: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;

export const ProjectSchema = z.object({
  projectName: z.string().min(2, 'Project name is required'),
  description: z.string().min(10, 'Description is required'),
  techStack: z.string().min(2, 'Tech stack is required'),
  role: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  repositoryUrl: z.string().url().optional().or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
