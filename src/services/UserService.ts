import { PrismaClient } from "@prisma/client";

import { registerCredentialsInterface } from "../types/AuthTypes";
import { generateHashedPassword } from "../infra/BcryptService";

import { userDTO } from "../types/UserTypes";

export default class UserService {
  private db = new PrismaClient();

  async saveUser(user: registerCredentialsInterface) {
    const hashedPassword = await generateHashedPassword(user.password);
    const { password, ...userDTO } = await this.db.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return userDTO;
  }

  async getUsersList() {
    const userList = await this.db.user.findMany();

    const usersDTO: userDTO[] = [];

    userList.forEach((user) => {
      const { password, ...userDTO } = user;
      usersDTO.push(userDTO);
    });

    return usersDTO;
  }

  async userExistsByEmail(email: string) {
    console.log(email);
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async userExistsByRegistryNumber(registryNumber: number) {
    console.log(registryNumber);
    return await this.db.user.findUnique({
      where: {
        registryNumber,
      },
    });
  }
}
