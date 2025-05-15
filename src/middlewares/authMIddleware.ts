import { FastifyReply, FastifyRequest } from "fastify";

import TokenService from "../infra/TokenService";

export default async function authMiddleware(
  req: FastifyRequest,
  res: FastifyReply
) {
  const tokenService = new TokenService();
  const headers = tokenService.checkHeaders(req.headers.authorization);

  const token = headers.split(" ")[1];

  const { userId, userRole } = tokenService.verifyToken(token);
  req.user = {
    id: userId,
    role: userRole,
  };
}
