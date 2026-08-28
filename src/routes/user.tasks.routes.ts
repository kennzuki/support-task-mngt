import {Router} from "express";
import { authorizeAdmin } from "../middleware/admin.middleware";
import { createUserTask } from "../services/user.task";


export const userTasksRouter = Router();

userTasksRouter.use(authorizeAdmin);

userTasksRouter.post ("/", async (req, res,next) => {
    try{

        const task= await createUserTask(req.user!.userId,req.body.title);
        res.status(201).json({success: true, data: task});

    }catch(error){
        next(error);
    }
})