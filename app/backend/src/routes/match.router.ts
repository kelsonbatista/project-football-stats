import * as express from 'express';
import MatchFactory from '../factory/match.factory';

const matchRouter = express.Router();
const matchFactory = new MatchFactory();
const matchController = matchFactory.controller();

matchRouter.get('/', matchController.getAllMatches);

matchRouter.get('/:id', matchController.getMatchById);

matchRouter.post('/', matchController.createMatch);

matchRouter.put('/:id', matchController.editMatch);

matchRouter.patch('/:id/finish', matchController.finishMatch);

matchRouter.delete('/:id', matchController.deleteMatch);

export default matchRouter;
