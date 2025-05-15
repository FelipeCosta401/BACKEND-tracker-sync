import { PrismaClient } from "@prisma/client";

import {
  cityRequiredFields,
  cityRegistrationRequestedFields,
} from "../types/CityTypes";

export default class CityService {
  private db = new PrismaClient();

  async saveCity({ name, uf }: cityRequiredFields, userId: number) {
    const newCity: cityRegistrationRequestedFields = {
      name,
      uf,
      slug: [name, uf].join(" / "),
      userId,
    };

    return await this.db.city.create({
      data: newCity,
    });
  }

  async getCityList() {
    return await this.db.city.findMany();
  }
}
