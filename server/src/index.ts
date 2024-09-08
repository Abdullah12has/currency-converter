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

const port = process.env.PORT || 8000;
const app: Express = express();

try {
  if (!process.env.NOENV && !fs.existsSync(".env")) {
    throw new Error(".env file not found. Did you copy the .env_example file to .env?");
  }

  if (!process.env.SWOP_API_KEY) {
    throw new Error("We need SWOP API key to get started");
  }
} catch (error) {
  console.error("Error:", error);
}

// Middlewares
app.use(cors());
app.use(loggingHandler);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// CSRF not really necessary becasue not doing anything other than GET in the app
app.use(csurf({ cookie: true }));

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ status: "Server is Working" });
});

app.get("/convert", validateInput, cacheMiddleware, convertCurrency);
app.use(routeNotFound);

app.listen(port, () => {
  logging.log("Listening on PORT", port);
});
