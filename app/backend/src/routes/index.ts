import { Router } from 'express';
import loginRouter from './login.router';
import userRouter from './user.router';
import teamRouter from './team.router';

const router = Router();

router.use('/login', loginRouter);

router.use('/users', userRouter);

router.use('/teams', teamRouter);

export default router;
