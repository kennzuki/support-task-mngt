import { appError } from "../errors/AppError";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import bycrpt from "bcrypt";

export async function registerUser(email: string, password: string): Promise<void> {
    if (!email || !password) {
        throw new appError(400,'Email and password are required for registration.');

    }
    if(password.length < 6){
        throw new appError(400,'Password must be at least 6 characters long.');
    }

  
  const normalizeEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizeEmail);

  if (existingUser) {
    throw new appError(409, 'User with this email already exists.');
  }

  const hashedPassword = await bycrpt.hash(password, 10);

  await createUser(normalizeEmail, hashedPassword);

}