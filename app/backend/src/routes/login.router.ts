import * as express from 'express';
import authToken from '../middlewares/auth.token.middleware';
import UserFactory from '../factory/user.factory';
import validateLogin from '../middlewares/validations/login.validate.middleware';

const loginRouter = express.Router();
const userFactory = new UserFactory();
const userController = userFactory.controller();

loginRouter.post('/', validateLogin, userController.login);

loginRouter.get('/validate', authToken, userController.getUserById);

export default loginRouter;
