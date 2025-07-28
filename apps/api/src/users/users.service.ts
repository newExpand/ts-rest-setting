import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSchema, UpdateUserSchema } from '@repo/api-contract';
import { z } from 'zod';

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class UsersService {
  // 임시 메모리 스토리지 (실제로는 데이터베이스 사용)
  private users: User[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'user1@example.com',
      name: 'User One',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = this.users.slice(start, end);

    return {
      items,
      total: this.users.length,
      page,
      limit,
      totalPages: Math.ceil(this.users.length / limit),
    };
  }

  findOne(id: string): User | null {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  create(data: z.infer<typeof CreateUserSchema>): User {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, data: z.infer<typeof UpdateUserSchema>): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.users[index];
  }

  remove(id: string): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }

  existsByEmail(email: string): boolean {
    return this.users.some((u) => u.email === email);
  }
}
