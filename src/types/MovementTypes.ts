import z from "zod";

const MovementeRequestSchema = z.object({
  description: z
    .string({
      required_error: "Campo 'description' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'description' não pode ser vazio!" }),
  equipmentType: z
    .string({
      required_error: "Campo 'equipmentType' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'equipmentType' não pode ser vazio!" }),
  equipmentDescription: z
    .string({
      required_error: "Campo 'equipmentDescription' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'equipmentDescription' não pode ser vazio!" }),
  originCity: z
    .string({
      required_error: "Campo 'originCity' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'originCity' não pode ser vazio!" }),
  destinyCity: z
    .string({
      required_error: "Campo 'destinyCity' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'destinyCity' não pode ser vazio!" }),
  originPlant: z
    .string({
      required_error: "Campo 'originPlant' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'originPlant' não pode ser vazio!" }),
  destinyPlant: z
    .string({
      required_error: "Campo 'destinyPlant' não pode ser vazio!",
    })
    .min(1, { message: "Campo 'destinyPlant' não pode ser vazio!" }),
});

type movementRequiredFields = z.infer<typeof MovementeRequestSchema>;

interface movementRegistrationRequestedFields extends movementRequiredFields {
  userId: number;
}

interface movementInterface extends movementRegistrationRequestedFields {
  id: number;
  registeredAt: Date | undefined;
}

export {
  MovementeRequestSchema,
  movementInterface,
  movementRegistrationRequestedFields,
  movementRequiredFields,
};
