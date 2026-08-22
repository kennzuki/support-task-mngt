import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction):void{

if(err instanceof AppError){
    res.status(err.statusCode).json({success: false, message: err.message});
}

    logger.error({err},"unhandled error");
    res.status(500).json({success: false, message: "Internal Server Error"});
}