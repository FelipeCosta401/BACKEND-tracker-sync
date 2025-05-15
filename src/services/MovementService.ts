import { PrismaClient } from "@prisma/client";

import {
  movementRegistrationRequestedFields,
  movementRequiredFields,
} from "../types/MovementTypes";

export default class MovementService {
  private db = new PrismaClient();

  async saveMovement(movement: movementRequiredFields, userId: number) {
    const newMovement: movementRegistrationRequestedFields = {
      ...movement,
      userId,
    };
    return await this.db.movement.create({
      data: newMovement,
    });
  }

  async getMovementList() {
    return await this.db.movement.findMany();
  }
}
