import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
    res.status(200).json({ success: true, message: "health route isOK" })
});