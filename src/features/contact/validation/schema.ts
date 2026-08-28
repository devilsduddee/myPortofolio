import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  personalWebsite: z.string().optional()
});

export type ContactFormValues = z.infer<typeof ContactSchema>;