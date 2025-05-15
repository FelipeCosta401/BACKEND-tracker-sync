import { FastifyError, FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { ZodError } from "zod";

export async function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply){
    console.error(error);

    if (error instanceof ZodError) {
      return reply.status(422).send({
        error: "Erro de validação",
        issues: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    
    const statusCode = (error.statusCode && typeof error.statusCode === "number")
      ? error.statusCode
      : 500;
  
    const message = error.message || "Erro interno no servidor";
  
    reply.status(statusCode).send({ error: message });
}

export default errorHandler