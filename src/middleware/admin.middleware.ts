import {Response,Request,NextFunction} from 'express';
import { AppError } from '../errors/AppError';


export function authorizeAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== "admin") {
    next(new AppError(403, "Access denied. Only admin users are allowed."));
    return;
  }

  next();
}