import { initContract } from "@ts-rest/core";
import { usersContract } from "./users.contract";
import { healthContract } from "./health.contract";

const c = initContract();

export const apiContract = c.router(
  {
    health: healthContract,
    users: usersContract,
  },
  {
    pathPrefix: "/api",
  }
);

export type ApiContract = typeof apiContract;
