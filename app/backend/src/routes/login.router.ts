import * as express from 'express';
import UserFactory from '../factory/user.factory';

const loginRouter = express.Router();
const userFactory = new UserFactory();
const userController = userFactory.controller();

loginRouter.post('/', userController.login);

export default loginRouter;
