import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authMiddleware from "../middlewares/authMIddleware";
import CityService from "../services/CityService";
import { CityRequestSchema } from "../types/CityTypes";
import roleMiddleware from "../middlewares/roleMiddleware";

export default function CityRoutes(app: FastifyInstance) {
  const cityService = new CityService();

  app.addHook("preHandler", authMiddleware);
  app.addHook(
    "preHandler",
    roleMiddleware(
      ["ADMIN", "LEADER"],
      "acessar recursos relacionado as cidades"
    )
  );

  app.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    const cityList = await cityService.getCityList();
    res.status(200).send(cityList);
  });

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const newCityCredentials = CityRequestSchema.parse(req.body);
    const createdCity = await cityService.saveCity(
      newCityCredentials,
      req.user.id
    );

    const response = {
      message: "Cidade cadastrada com sucesso!",
      createdCity,
    };

    res.status(201).send(response);
  });
}
