import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import IError from '../protocols/error.interface';

const eStatus = (name: string): number => {
  switch (name) {
    case 'BAD_REQUEST': return StatusCodes.BAD_REQUEST;
    case 'UNAUTHORIZED': return StatusCodes.UNAUTHORIZED;
    case 'NOT_FOUND': return StatusCodes.NOT_FOUND;
    case 'CONFLICT': return StatusCodes.CONFLICT;
    default: return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.name) {
    return res.status(eStatus(err.name)).json({ message: err.message });
  }
  console.log(err.message);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export default errorMiddleware;
