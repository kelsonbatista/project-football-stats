import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import UserFactory from '../factory/user.factory';

const secret: any = process.env.SECRET_KEY;
const userFactory = new UserFactory();
const userService = userFactory.service();

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    id: number;
  }
}

// verifica se o token existe no header
// verifica se o token é valido
// verifica se o usuario do token informado existe no banco de dados
// se o usuario nao existe, retorna erro, caso contrario segue o middleware
const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found' });
    }
    const decode = <jwt.UserIDJwtPayload>jwt.verify(token, secret);
    const user = await userService.getUserById(decode.data.id);
    req.user = user;
    if (!user) {
      return next({ status: StatusCodes.BAD_REQUEST, message: 'User not found' });
    }
    next();
  } catch (err) {
    console.log(`Error: ${err}`);
    next({ status: StatusCodes.UNAUTHORIZED, message: 'Invalid token' });
  }
};

export default authToken;
