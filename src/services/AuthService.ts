import RegionService from "./RegionService";
import UserService from "./UserService";
import TokenService from "../infra/TokenService";
import { passwordsCompare } from "../infra/BcryptService";

// Exceptions
import AppError from "../Exceptions/AppError";

// Middlewares
import roleMiddleware from "../middlewares/roleMiddleware";

// Types
import {
  loginCredentialsInterface,
  registerCredentialsInterface,
} from "../types/AuthTypes";
import { userRole } from "../types/UserTypes";

export default class AuthService {
  private tokenService = new TokenService();
  private userSerivce = new UserService();
  private regionService = new RegionService();

  async login({ login, password }: loginCredentialsInterface) {
    const userExists = await this.userExists(login);

    if (!userExists) {
      throw new AppError("Credenciais inválidas!", 422);
    }

    const { password: userPassword, ...user } = userExists;

    const passwordsMatch = await passwordsCompare(password, userPassword);

    if (!passwordsMatch) {
      throw new AppError("Credenciais inválidas!", 422);
    }

    const token = this.tokenService.generateToken(user.id, user.role);

    const loggedUser = {
      user,
      token,
    };

    return loggedUser;
  }

  async register(
    credentials: registerCredentialsInterface,
    creatorUserRole: userRole
  ) {
    await this.validateRegisterCredentials(credentials);

    let acceptableNewUserRole: userRole[] = [
      "ADMIN",
      "AGENT",
      "LEADER",
      "SUPPORT",
    ];
    if (creatorUserRole === "LEADER") {
      acceptableNewUserRole = acceptableNewUserRole.filter(
        (role) => role !== "ADMIN"
      );
    }

    if (!acceptableNewUserRole.includes(credentials.role))
      throw new AppError(
        "Usuário não tem permissão para cadastrar um registro com esse nível de acesso!",
        403
      );

    return await this.userSerivce.saveUser(credentials);
  }

  private async validateRegisterCredentials(
    user: registerCredentialsInterface
  ) {
    const emailAlreadyExists = await this.userExists(user.email);
    if (emailAlreadyExists) {
      throw new AppError("Email já cadastrado!");
    }

    const registryNumberExists = await this.userExists(
      String(user.registryNumber)
    );
    if (registryNumberExists) {
      throw new AppError("Número de registro já cadastrado!");
    }

    const regionExists = await this.regionService.regionExistsById(
      user.regionId
    );
    if (!regionExists) throw new AppError("Essa região não existe!", 422);
  }

  private async userExists(login: string) {
    if (login.includes("@")) {
      return await this.userSerivce.userExistsByEmail(login);
    }
    return await this.userSerivce.userExistsByRegistryNumber(Number(login));
  }
}
