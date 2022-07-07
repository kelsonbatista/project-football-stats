import IUser, { IUserModel } from '../protocols/user.interface';
import UserModel from '../database/models';

export default class UserRepository implements IUserModel {
  constructor(private model: UserModel) {
    this.model = model;
  }

  public async login(): Promise<IUser[]> {
    const users = await this.model.findAll();
    return users;
  }
}
