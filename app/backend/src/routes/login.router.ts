import * as express from 'express';
import UserFactory from '../factory/user.factory';
import validateLogin from '../middlewares/validations/login.validate.middleware';

const loginRouter = express.Router();
const userFactory = new UserFactory();
const userController = userFactory.controller();

loginRouter.post('/', validateLogin, userController.login);

export default loginRouter;
