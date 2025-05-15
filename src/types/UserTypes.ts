import z from "zod";
import { registerCredentialsInterface } from "./AuthTypes";

export const UserRoleSchema = z.enum(["ADMIN", "LEADER", "AGENT", "SUPPORT"]);

export type userRole = z.infer<typeof UserRoleSchema>;

export interface userInterface extends registerCredentialsInterface {
  id: number;
}

export type userDTO = Omit<userInterface, "password" | "firstAccessAt"> & {
  firstAccessAt: Date | null
};
