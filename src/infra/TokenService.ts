import jwt from "jsonwebtoken";
import AppError from "../Exceptions/AppError";
import { userInterface, userRole } from "../types/UserTypes";
import { error } from "console";

export default class TokenService {
  private tokenSecret = process.env.TOKEN_SECRET;

  generateToken(id: number, role: userRole) {
    // console.log(`Gerando token com user id: ${id}, e user role: ${role}`)
    if (!this.tokenSecret) {
      throw new AppError("Erro ao gerar token de acesso", 500);
    }

    return jwt.sign(
      {
        userId: id,
        userRole: role,
      },
      this.tokenSecret
    );
  }

  verifyToken(token: string) {
    if (!this.tokenSecret) throw new AppError("Erro ao validar token", 500);
    try {
      return jwt.verify(token, this.tokenSecret) as {
        userId: number;
        userRole: userRole;
      };
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError)
        throw new AppError("Token expirado", 401);

      if (e instanceof jwt.JsonWebTokenError)
        throw new AppError("Token inválido", 401);

      throw new AppError("Erro desconhecido ao verificar token", 500);
    }
  }

  checkHeaders(token?: string) {
    if (!token) {
      console.log("Erro ao recuperar token do headers");
      throw new AppError("Usuário não autenticado!", 401);
    }
    return token;
  }
}
