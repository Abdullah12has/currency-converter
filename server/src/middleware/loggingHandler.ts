import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
export const loggingHandler = (req: Request, res: Response, next: NextFunction) => {
  logging.log(`Incoming- METHOD: ${req.method} URL: ${req.url}. IP Address: ${req.socket.remoteAddress}`);

  res.on("finish", () => {
    logging.info(
      `Result - METHOD: ${req.method} URL:${req.url} IP:${req.socket.remoteAddress} STATUS: ${res.statusCode}`
    );
  });

  next();
};
