import { Request, Response, NextFunction } from "express";

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("NOT FOUND");
  logging.warning(error);

  return res.status(404).json({
    error: {
      message: error.message,
    },
  });
};



