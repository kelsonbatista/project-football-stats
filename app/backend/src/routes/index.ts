import { Router } from 'express';
import loginRouter from './login.router';
import userRouter from './user.router';

const router = Router();

router.use('/login', loginRouter);

router.use('/users', userRouter);

export default router;
