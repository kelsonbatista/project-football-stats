import UserController from '../controllers/user.controller';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';
import config = require('../database/config/database');

export default class UserFactory {
  public controller = () => {
    const model = new UserRepository(config);
    const service = new UserService(model);
    const controller = new UserController(service);
    return controller;
  };
}
