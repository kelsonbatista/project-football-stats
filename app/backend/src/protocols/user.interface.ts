export default interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(payload: IUser): Promise<IUser[]>;
}

export interface IUserModel {
  login(payload: IUser): Promise<IUser[]>;
}
