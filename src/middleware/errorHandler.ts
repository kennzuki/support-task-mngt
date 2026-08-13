import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction):void{
    logger.error({err},"unhandled error");
    res.status(500).json({success: false, message: "Internal Server Error"});
}