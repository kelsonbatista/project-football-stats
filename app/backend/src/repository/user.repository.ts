import IUser, { IUserModel } from '../protocols/user.interface';
import UserModel from '../database/models/user.model';

export default class UserRepository implements IUserModel {
  constructor(private model = UserModel) {
    this.model = model;
  }

  public login = async (): Promise<IUser[]> => {
    const users = await UserModel.findAll();
    return users;
  };
}
