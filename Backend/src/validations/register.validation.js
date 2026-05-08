import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters long")
      .trim(),
    email: z.string()
      .email("Please provide a valid email address")
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .email("Invalid email format")
      .trim(),
    password: z.string()
      .min(1, "Password is required") 
  })
});