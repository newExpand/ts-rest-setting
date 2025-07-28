import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { 
  ErrorResponseSchema, 
  PaginationSchema, 
  PaginatedResponseSchema 
} from '../schemas/common.schema';
import { 
  UserSchema, 
  CreateUserSchema, 
  UpdateUserSchema 
} from '../schemas/user.schema';

const c = initContract();

export const usersContract = c.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: PaginatedResponseSchema(UserSchema),
      400: ErrorResponseSchema,
    },
    query: PaginationSchema,
    summary: 'Get all users with pagination',
  },
  getUser: {
    method: 'GET',
    path: '/users/:id',
    responses: {
      200: UserSchema,
      404: ErrorResponseSchema,
    },
    summary: 'Get a user by ID',
  },
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: UserSchema,
      400: ErrorResponseSchema,
      409: ErrorResponseSchema,
    },
    body: CreateUserSchema,
    summary: 'Create a new user',
  },
  updateUser: {
    method: 'PATCH',
    path: '/users/:id',
    responses: {
      200: UserSchema,
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
    },
    body: UpdateUserSchema,
    summary: 'Update a user',
  },
  deleteUser: {
    method: 'DELETE',
    path: '/users/:id',
    responses: {
      204: z.object({}),
      404: ErrorResponseSchema,
    },
    summary: 'Delete a user',
  },
});