import { FastifyRequest } from "fastify";
import AppError from "../Exceptions/AppError";
import { userRole } from "../types/UserTypes";

export default function roleMiddleware(
  requiredRoles: userRole[],
  action: string
) {
  return async (req: FastifyRequest) => {
    const { role } = req.user;

    if (!requiredRoles.includes(role)) {
      throw new AppError(`Usuário não tem permissão para ${action}!`, 403);
    }
  };
}
