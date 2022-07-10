import * as express from 'express';
import MatchFactory from '../factory/match.factory';
import authToken from '../middlewares/auth.token.middleware';

const matchRouter = express.Router();
const matchFactory = new MatchFactory();
const matchController = matchFactory.controller();

matchRouter.get('/', matchController.getAllMatches);

matchRouter.get('/:id', matchController.getMatchById);

matchRouter.post('/', authToken, matchController.createMatch);

matchRouter.patch('/:id', matchController.editMatch);

matchRouter.patch('/:id/finish', matchController.finishMatch);

matchRouter.delete('/:id', matchController.deleteMatch);

export default matchRouter;
