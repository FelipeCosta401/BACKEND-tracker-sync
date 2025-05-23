import { userRole } from "../UserTypes"
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: number;
      role: userRole;
    };
  }
}