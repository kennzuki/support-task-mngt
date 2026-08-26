import { AppError } from "../errors/AppError";
import { signAccessToken } from "../lib/jwt";
import { findUserByEmail, createUser, findUserByEmailWithPassword } from "../repositories/user.repository";
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

export async function loginUser(email: string, password: string): Promise<{ accessToken: string }> {
    if (!email || !password) {
        throw new AppError(400,'Email and password are required for login.');
    }

    const normalizeEmail = email.toLowerCase().trim();

    const user = await findUserByEmailWithPassword(normalizeEmail);

    if (!user?.password_hash) {
        throw new AppError(401, 'Invalid email or password.');
    }

    const isPasswordValid = await bycrpt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        throw new AppError(401, 'Invalid email or password.');
    }

    const accessToken=signAccessToken({
        userId:user.id,
        email:user.email,
        role:user.role,
    }); 
    return {accessToken}
}


