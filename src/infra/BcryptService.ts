
import bcrypt from "bcrypt"

export async function generateHashedPassword(rawPassword: string) {
    return await bcrypt.hash(rawPassword, 12)
}

export async function passwordsCompare(loginPassword: string, userPassword: string) {
    return await bcrypt.compare(loginPassword, userPassword)
}