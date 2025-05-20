import z from "zod";

const RegionRequestSchema = z.object({
  name: z
    .string({ required_error: "Campo 'name' não pode ser vazio!" })
    .min(5, { message: "Campo 'name' precisa ter ao menos 5 caracteres" }), 
    
});

type regionCredentialsInterface = z.infer<typeof RegionRequestSchema>

export { RegionRequestSchema, regionCredentialsInterface }