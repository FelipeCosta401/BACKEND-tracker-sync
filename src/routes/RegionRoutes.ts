import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// Services
import RegionService from "../services/RegionService";

// Middleware
import authMiddleware from "../middlewares/authMIddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

// Types
import { RegionRequestSchema } from "../types/RegionType";

export default async function RegionRoutes(app: FastifyInstance) {
  const regionService = new RegionService()

  app.addHook("preHandler", authMiddleware)
  app.addHook("preHandler", roleMiddleware(["ADMIN", "LEADER"], "acessar recursos das regiões!"))

  app.get("/", async (_, res: FastifyReply) => {
    const regionList = await regionService.getRegionList()
    const response = {
      message: "Lista de regiões",
      regionList
    }
    res.status(200).send(response)
  })  

  app.post("/", async (req: FastifyRequest, res: FastifyReply) => {
    const { name } = RegionRequestSchema.parse(req.body)
    const createdRegion = await regionService.saveRegion({name})
    const response = {
      message: "Região cadastrada com sucesso!",
      region: createdRegion
    }

    res.status(201).send(response)
  }); 
}
