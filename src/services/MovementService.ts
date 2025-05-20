import { PrismaClient } from "@prisma/client";

// Services
import UserService from "./UserService";

// Types
import { movementRegistrationRequestedFields } from "../types/MovementTypes";

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

  async getMovementList() {
    return await this.db.movement.findMany();
  }
}
