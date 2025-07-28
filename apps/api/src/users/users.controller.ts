import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler, TsRestException } from '@ts-rest/nest';
import { apiContract } from '@repo/api-contract';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private notFoundResponse() {
    return {
      status: 404 as const,
      body: {
        message: 'User not found',
        statusCode: 404,
        error: 'Not Found',
      },
    };
  }

  @TsRestHandler(apiContract.users)
  handler() {
    return tsRestHandler(apiContract.users, {
      getUsers: async ({ query }) => {
        const result = this.usersService.findAll(query.page, query.limit);
        return { status: 200 as const, body: result };
      },

      getUser: async ({ params }) => {
        const user = this.usersService.findOne(params.id);

        if (!user) {
          return this.notFoundResponse();
        }

        return { status: 200 as const, body: user };
      },

      createUser: async ({ body }) => {
        // 이메일 중복 체크
        const exists = this.usersService.existsByEmail(body.email);
        if (exists) {
          throw new TsRestException(apiContract.users.createUser, {
            status: 409,
            body: {
              message: 'User with this email already exists',
              statusCode: 409,
              error: 'Conflict',
            },
          });
        }

        const user = this.usersService.create(body);
        return { status: 201 as const, body: user };
      },

      updateUser: async ({ params, body }) => {
        try {
          const user = this.usersService.update(params.id, body);
          return { status: 200 as const, body: user };
        } catch {
          return this.notFoundResponse();
        }
      },

      deleteUser: async ({ params }) => {
        try {
          this.usersService.remove(params.id);
          return { status: 204 as const, body: undefined };
        } catch {
          return this.notFoundResponse();
        }
      },
    });
  }
}
