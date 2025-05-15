import z from "zod";

const CityRequestSchema = z.object({
  name: z
    .string({ required_error: "Campo 'name' não pode ser vazio!" })
    .min(3, { message: "Campo 'name' precisa ter ao menos 3 caracteres" }),
  uf: z
    .string({ required_error: "Campo 'uf' não pod ser vazio!" })
    .min(2, { message: "Campo 'uf' precisa ter 2 caracteres" })
    .max(2, { message: "Campo 'uf' precisa ter 2 caracteres" }),
});

type cityRequiredFields = z.infer<typeof CityRequestSchema>;

interface cityRegistrationRequestedFields extends cityRequiredFields {
  slug: string;
  userId: number;
}

interface cityInterface extends cityRegistrationRequestedFields {
  id: number;
  registeredAt: Date | undefined;
}

export { CityRequestSchema, cityInterface, cityRegistrationRequestedFields, cityRequiredFields };
