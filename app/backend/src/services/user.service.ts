import IUser, { IUserModel, IUserService } from '../protocols/user.interface';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  public async login(): Promise<IUser[]> {
    const users = await this.model.login();
    return users;
  }
}
