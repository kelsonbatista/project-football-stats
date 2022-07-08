import { Op } from 'sequelize';
import IUser, { IUserModel } from '../protocols/user.interface';
import UserModel from '../database/models/user.model';

export default class UserRepository implements IUserModel {
  constructor(private model = UserModel) {
    this.model = model;
  }

  public login = async (payload: IUser): Promise<IUser> => {
    const { email, password } = payload;
    const user = await this.model.findOne({ where: { [Op.and]: [{ email }, { password }] } });
    return user as unknown as IUser;
  };
}
