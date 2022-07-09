import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../protocols/user.interface';
import HandleToken from '../utils/handle.token';

export default class UserController {
  private handleToken = new HandleToken();

  constructor(private service: IUserService) {
    this.service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.login(req.body);
      if (user) {
        const userInfo = {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        };
        const token = this.handleToken.getToken(userInfo);
        return res.status(StatusCodes.OK).json({ token });
      }
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    } catch (err) {
      next(err);
    }
  };

  public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (err) {
      next(err);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.query.user;
      const id = req.params.id || userData.id;
      const user = await this.service.getUserById(id);
      if (!user) {
        const error = new Error('User not found');
        error.name = 'NOT_FOUND';
        throw error;
      }
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const userExists = await this.service.checkUser(user);
      if (userExists) {
        const error = new Error('User already exists');
        error.name = 'CONFLICT';
        throw error;
      }
      const result = await this.service.createUser(user);
      const { password: passDB, ...userInfo } = result;
      const token = this.handleToken.getToken(userInfo);
      // return res
      //   .status(StatusCodes.CREATED)
      //   .json({ ...token, message: 'User successfully created' });
      return res.status(StatusCodes.CREATED).json({ token });
    } catch (err) {
      next(err);
    }
  };

  public editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userInfo = req.body;
      const user = await this.service.editUser(id, userInfo);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.deleteUser(id);
      return res.status(StatusCodes.NO_CONTENT).json({ message: 'User successfully deleted' });
    } catch (err) {
      next(err);
    }
  };
}
