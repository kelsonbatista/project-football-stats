export default interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(payload: IUser): Promise<IUser | undefined>;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser>;
  checkUser(user: IUser): Promise<IUser>;
  createUser(user: IUser): Promise<IUser>;
  editUser(id: string, user: IUser): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
}

export interface IUserModel {
  login(email: string): Promise<IUser | undefined>;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser>;
  checkUser(user: IUser): Promise<IUser>;
  createUser(user: IUser): Promise<IUser>;
  editUser(id: string, user: IUser): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
}
