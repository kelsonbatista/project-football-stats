import UserController from '../controllers/user.controller';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';

export default class UserFactory {
  public service = () => {
    const model = new UserRepository();
    const service = new UserService(model);
    return service;
  };

  public controller = () => {
    const model = new UserRepository();
    const service = new UserService(model);
    const controller = new UserController(service);
    return controller;
  };
}
