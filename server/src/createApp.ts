import express, { Express, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";
import csurf from "csurf";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loggingHandler } from "./middleware/loggingHandler";
import { validateInput } from "./middleware/validateInput";
import { cacheMiddleware } from "./middleware/cache";
import { convertCurrency } from "./controllers/convertController";
import { routeNotFound } from "./middleware/errorHandling";

export const createApp = () => {
  const app: Express = express();

  // Middlewares
  app.use(cors());
  app.use(loggingHandler);
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());

  app.use(csurf({ cookie: true }));

  app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is Working" });
  });

  app.get("/convert", validateInput, cacheMiddleware, convertCurrency);
  app.use(routeNotFound);

  return app;
};
