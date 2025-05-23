import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import MovementService from "../services/MovementService";
import authMiddleware from "../middlewares/authMIddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
import { MovementeRequestSchema } from "../types/MovementTypes";

export default function MovementRoutes(app: FastifyInstance) {
  const movementService = new MovementService();

  app.addHook("preHandler", authMiddleware);
  app.addHook(
    "preHandler",
    roleMiddleware(
      ["ADMIN", "AGENT", "LEADER"],
      "cadastrar uma nova movimentação"
    )
  );

  app.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    const { id: userId } = req.user
    const movementList = await movementService.getMovementList(userId);
    res.status(200).send(movementList);
  });

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const movement = MovementeRequestSchema.parse(req.body);
    const userId = req.user.id;
    const createdMovement = await movementService.saveMovement({
      ...movement,
      userId
    });
    const response = {
      message: "Movimentação cadastrada com sucesso!",
      createdMovement,
    };

    res.status(201).send(response);
  });
}
