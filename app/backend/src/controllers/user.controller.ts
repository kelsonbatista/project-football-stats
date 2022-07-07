import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../protocols/user.interface';
// import HandleToken from "../utils/handleToken";

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.login(req.body);
      return res.status(StatusCodes.OK).json(users);
    } catch (err) {
      next(err);
    }
  };
}
