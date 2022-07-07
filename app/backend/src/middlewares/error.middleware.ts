import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import IError from '../protocols/error.interface';

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(`Error: ${err.message}`);
  if (err.message === 'User not found') {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
  if (err.message === 'User already exists') {
    return res.status(StatusCodes.CONFLICT).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export default errorMiddleware;
