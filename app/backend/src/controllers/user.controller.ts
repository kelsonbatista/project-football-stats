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
      const user = await this.service.login(req.body);
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid user or password',
        });
      }
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
    }
  };
}
