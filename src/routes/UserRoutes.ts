import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import UserService from "../services/UserService";
import authMiddleware from "../middlewares/authMIddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

export default function UserRoutes(app: FastifyInstance) {
  const userService = new UserService();

  app.addHook("preHandler", authMiddleware);
  app.addHook(
    "preHandler",
    roleMiddleware(["ADMIN", "LEADER"], "acessar recursos de outros usuários")
  );

  app.get("/", (req: FastifyRequest, res: FastifyReply) => {
    return userService.getUsersList();
  });

  app.put("/user", (req: FastifyRequest, res: FastifyReply) => {
    return userService.getUsersList();
  });
}
