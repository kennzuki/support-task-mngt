import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { TokenPayload } from "../types/user";
import jwt,{SignOptions} from "jsonwebtoken";


export function signAccessToken(payload: TokenPayload): string {

    const options: SignOptions = {
        expiresIn: env.jwtAccessExpiration as SignOptions["expiresIn"],
    };
    return jwt.sign(payload, env.jwtAccessSecret, options);
}

export function verifyAccessToken(token: string): TokenPayload {
    try {
        const decoded = jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
        return decoded;
    } catch (error) {
        throw new AppError(401,"Invalid token");
    }
}