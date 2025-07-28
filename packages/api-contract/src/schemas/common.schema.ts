import { z } from 'zod';

export const ErrorResponseSchema = z.object({
  message: z.string().min(1),
  statusCode: z.number().int().min(100).max(599),
  error: z.string().optional(),
  timestamp: z.string().datetime().optional(),
  path: z.string().optional(),
});

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  });