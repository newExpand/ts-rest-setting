import { initClient } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import { apiContract } from '@repo/api-contract';

// 기본 ts-rest 클라이언트 (서버 컴포넌트용)
export const apiClient = initClient(apiContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4300',
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});

// React Query 통합 클라이언트 (클라이언트 컴포넌트용)
export const apiQueryClient = initQueryClient(apiContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4300',
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});