import * as express from 'express';
import UserFactory from '../factory/user.factory';

const userRouter = express.Router();
const userFactory = new UserFactory();
const userController = userFactory.controller();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUserById);

userRouter.post('/', userController.createUser);

userRouter.put('/:id', userController.editUser);

userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
