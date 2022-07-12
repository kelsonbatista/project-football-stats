import * as express from 'express';
import LBoardFactory from '../factory/leaderboard.factory';

const LBoardRouter = express.Router();
const boardFactory = new LBoardFactory();
const boardController = boardFactory.controller();

// LBoardRouter.get('/', boardController.getBoards);

LBoardRouter.get('/matches/:homeAwayTeam', boardController.getMatches);

LBoardRouter.get('/:homeAwayTeam', boardController.getLeaderboard);

export default LBoardRouter;
