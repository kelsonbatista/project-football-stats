import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import IUser, { IUserModel, IUserService } from '../protocols/user.interface';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  public async login(payload: IUser): Promise<IUser | undefined> {
    const { email, password } = payload;
    const user = await this.model.login(email);
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      const error = new Error('Incorrect email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
    return user;
  }

  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.model.getAllUsers();
    return result;
  }

  public async getUserById(id: string): Promise<IUser> {
    const user = await this.model.getUserById(id);
    return user;
  }

  public async checkUser(user: IUser): Promise<IUser> {
    const userCheck = await this.model.checkUser(user);
    return userCheck as IUser;
  }

  public async createUser(user: IUser): Promise<IUser> {
    const { password, ...userInfo } = user;
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    const result = await this.model.createUser({ password: passHash, ...userInfo });
    return result as unknown as IUser;
  }

  public async editUser(id: string, user: IUser): Promise<IUser> {
    const result = await this.model.editUser(id, user);
    return result as IUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.model.deleteUser(id);
  }
}
