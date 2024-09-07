import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const structure = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = structure.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  
  next();
};
