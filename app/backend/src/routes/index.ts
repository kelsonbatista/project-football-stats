import { Router } from 'express';
import loginRouter from './login.router';
import userRouter from './user.router';
import teamRouter from './team.router';
import matchRouter from './match.router';
import LBoardRouter from './leaderboard.router';

const router = Router();

router.use('/login', loginRouter);

router.use('/users', userRouter);

router.use('/teams', teamRouter);

router.use('/matches', matchRouter);

router.use('/leaderboard', LBoardRouter);

export default router;
