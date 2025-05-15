import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import AuthService from "../services/AuthService";

import { LoginRequestSchema, RegisterRequestSchema } from "../types/AuthTypes";
import authMiddleware from "../middlewares/authMIddleware";
import adminMiddleware from "../middlewares/roleMiddleware";

export default async function AuthRoutes(app: FastifyInstance) {
  const authService = new AuthService();

  app.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    const credentials = LoginRequestSchema.parse(req.body);
    const { token, user } = await authService.login(credentials);
    const response = {
      message: "Autenticado com sucesso!",
      token,
      user,
    };
    res.status(200).send(response);
  });

  app.post(
    "/register",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware(["ADMIN", "LEADER"], "criar registros"),
      ],
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      const { passwordConfirmation, ...userData } = RegisterRequestSchema.parse(
        req.body
      );
      const { role: creatorUserRole } = req.user
      const createdUser = await authService.register(userData, creatorUserRole);
      const response = {
        message: "Usuário cadastrado com sucesso!",
        createdUser,
      };

      res.status(201).send(response);
    }
  );
}
