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

  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async getUserById(id: string): Promise<IUser> {
    const user = await this.model.findByPk(id);
    return user as IUser;
  }

  public async checkUser(user: IUser): Promise<IUser> {
    const { username, email } = user;
    const userCheck = await this.model
      .findOne({ where: { [Op.or]: [{ username }, { email }] } });
    return userCheck as IUser;
  }

  public async createUser(user: IUser): Promise<IUser> {
    const response = await this.model.create(user).then((result) => result.toJSON());
    return response as IUser;
  }

  public async editUser(id: string, user: IUser): Promise<IUser> {
    const result = await this.model.update({ id, ...user }, { where: { id } });
    return result as unknown as IUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
