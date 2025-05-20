import { PrismaClient } from "@prisma/client";
import { regionCredentialsInterface } from "../types/RegionType";
import AppError from "../Exceptions/AppError";

export default class RegionService {
  private db = new PrismaClient();

  async saveRegion({ name }: regionCredentialsInterface) {
    const regionNameAlreadyTaken = await this.regionExistsByName(name);
    if (regionNameAlreadyTaken)
      throw new AppError("Nome para a região inválido, escolha outro!");

    return await this.db.region.create({
      data: {
        name,
      },
    });
  }

  async getRegionList() {
    return await this.db.region.findMany({
      include: {
        cities: true,
        movements: true,
        users: {
          select: {
            id: true,
            name: true,
            registryNumber: true,
            email: true,
            role: true,
            registeredAt: true,
            firstAccessAt: true,
          },
        },
      },
    });
  }

  async regionExistsById(id: number) {
    return await this.db.region.findUnique({
      where: {
        id,
      },
    });
  }

  async regionExistsByName(name: string) {
    return await this.db.region.findUnique({
      where: {
        name,
      },
    });
  }
}
