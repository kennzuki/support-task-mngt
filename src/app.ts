import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";

export function createApp() {

  const app = express();
  app.use(express.json());
  app.use(errorHandler);
  app.use(notFoundHandler);
}





