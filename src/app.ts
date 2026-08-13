import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import cors from "cors";

export function createApp() {

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);
  app.use(notFoundHandler);
}





