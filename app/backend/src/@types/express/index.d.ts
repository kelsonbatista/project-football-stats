import { IUser } from '../protocols/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
