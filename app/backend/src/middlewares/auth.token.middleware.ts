import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

const secret: any = process.env.JWT_SECRET;

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    id: number;
  }
}

const authToken = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found' });
    }
    const decode = <jwt.UserIDJwtPayload>jwt.verify(token, secret);
    req.query.user = decode.data;
    next();
  } catch (err) {
    console.log(`Error: ${err}`);
    next({ status: StatusCodes.UNAUTHORIZED, message: 'Invalid token' });
  }
};

export default authToken;
