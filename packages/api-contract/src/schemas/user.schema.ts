import { z } from 'zod';

export const UserSchema = z.object({
  /** @description Unique identifier for the user */
  id: z.string().uuid(),
  /** @description User's email address */
  email: z.string().email(),
  /** @description User's display name */
  name: z.string().min(1).max(100),
  /** @description When the user was created (ISO datetime) */
  createdAt: z.string().datetime(),
  /** @description When the user was last updated (ISO datetime) */
  updatedAt: z.string().datetime(),
});

export const CreateUserSchema = z.object({
  /** @description User's email address */
  email: z.string().email(),
  /** @description User's display name */
  name: z.string().min(1).max(100),
  /** @description User's password (minimum 6 characters) */
  password: z.string().min(6).max(255),
});

export const UpdateUserSchema = z.object({
  /** @description User's email address */
  email: z.string().email().optional(),
  /** @description User's display name */
  name: z.string().min(1).max(100).optional(),
  /** @description User's password (minimum 6 characters) */
  password: z.string().min(6).max(255).optional(),
});