import { PrismaClient } from "@prisma/client";

// Services
import UserService from "./UserService";

// Types
import {
  movementInterface,
  movementRegistrationRequestedFields,
} from "../types/MovementTypes";
import { userRole } from "../types/UserTypes";

export default class MovementService {
  private db = new PrismaClient();
  private userService = new UserService();

  async saveMovement(movement: movementRegistrationRequestedFields) {
    const { regionId } = await this.userService.getUserById(movement.userId);

    return await this.db.movement.create({
      data: {
        ...movement,
        regionId,
      },
    });
  }

  async getMovementList(userId: number) {
    const { regionId, role: userRole } = await this.userService.getUserById(
      userId
    );
    if (userRole === "ADMIN") return await this.db.movement.findMany();
    return await this.db.movement.findMany({
      where: {
        regionId
      },
    });
  }
}
