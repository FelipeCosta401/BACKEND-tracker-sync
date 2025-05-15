import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import CityRoutes from "./CityRoutes";
import MovementRoutes from "./MovementRoutes";

export default async function routes(app: FastifyInstance) {
  app.register(AuthRoutes, { prefix: "/auth" });
  app.register(UserRoutes, { prefix: "/users" });
  app.register(CityRoutes, { prefix: "/city" });
  app.register(MovementRoutes, { prefix: "/movement" });
}
