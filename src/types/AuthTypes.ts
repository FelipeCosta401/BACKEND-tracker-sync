import z from "zod";
import { UserRoleSchema } from "./UserTypes";

const LoginRequestSchema = z.object({
  login: z
    .string({
      required_error: "Campo 'login' faltando!",
    })
    .min(1, { message: "Campo 'login' não pode ser vazio!" })
    .refine((val) => val.includes("@") || /^\d{5,}$/.test(val), {
      message: "Campo 'login' deve ser um e-mail ou número de registro válido!",
    })
    .transform((val) => {
      if (val.includes("@")) {
        return z.string().email().parse(val);
      } else {
        return z.string().parse(val);
      }
    }),
  password: z
    .string({ required_error: "Campo 'senha' faltando!" })
    .min(1, { message: "Campo 'senha' não pode ser vazio!" }),
});

const RegisterRequestSchema = z
  .object({
    name: z
      .string({ required_error: "Campo 'name' não pode ser vazio!" })
      .min(5, { message: "Campo 'name' precisa ter ao menos 5 caracteres" }),
    registryNumber: z
      .string()
      .regex(/^\d{5,6}$/, {
        message:
          "Campo 'registryNumber' deve conter entre 5 e 6 dígitos numéricos",
      })
      .transform((val) => Number(val)),
    password: z
      .string({ required_error: "Campo 'password' não pode ser vazio!" })
      .min(5, {
        message: "Campo 'password' precisa ter ao menos 5 caracteres",
      }),
    passwordConfirmation: z
      .string({
        required_error: "Campo 'passwordConfirmation' não pode ser vazio!",
      })
      .min(5, {
        message:
          "Campo 'passwordConfirmation' precisa ter ao menos 5 caracteres",
      }),
    email: z
      .string({ required_error: "Campo 'email' não pode ser vazio!" })
      .email({ message: "Formato inválido de email" }),
    role: UserRoleSchema.default("ADMIN"),
    regionId: z
      .number({ required_error: "Campo 'regionId' é não pode ser vazio" })
      .min(1, { message: "Campo 'regionId' é não pode ser vazio" }),
    registeredAt: z.date().optional(),
    firstAccessAt: z.date().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
  });

type registerCredentialsInterface = Omit<
  z.infer<typeof RegisterRequestSchema>,
  "passwordConfirmation"
>;
type loginCredentialsInterface = z.infer<typeof LoginRequestSchema>;

export {
  LoginRequestSchema,
  loginCredentialsInterface,
  RegisterRequestSchema,
  registerCredentialsInterface,
};
