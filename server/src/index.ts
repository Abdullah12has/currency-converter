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
import { createApp } from "./createApp";

const port = process.env.PORT || 8000;
const app = createApp();

try {
  if (!process.env.NOENV && !fs.existsSync(".env")) {
    throw new Error(".env file not found. Did you copy the .env_example file to .env and add your API key?");
  }

  if (!process.env.SWOP_API_KEY) {
    throw new Error("We need SWOP API key to get started");
  }
} catch (error) {
  console.error("Error:", error);
}

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logging.log("Listening on PORT", port);
  });
}
