import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from './schemas/login.schema';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const { error } = loginSchema.validate(user);
  if (error) {
    const details = error.details[0];
    if (details.type === 'any.required') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: details.message });
    }
    return next({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: details.message,
    });
  }
  next();
};

export default validateLogin;
