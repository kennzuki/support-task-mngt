import { Task } from "../types/task";
import { AppError } from "../errors/AppError";
import {createTask } from "../repositories/user.task.respository";

function validateTitle(title: unknown): string {
    if (typeof title !== "string"|| title.trim() === "") {
        throw new AppError(400, "Invalid title. Title must be a non-empty string.");
    }
    const trimmedTitle = title.trim();

    if (trimmedTitle.length > 100) {
        throw new AppError(400, "Invalid title. Title must not exceed 100 characters.");
    }

    return trimmedTitle;
}
export const createUserTask = async (title: unknown,  userId: string): Promise<Task> => {  
  const validTitle=validateTitle(title);
  return createTask(validTitle, userId);
  }