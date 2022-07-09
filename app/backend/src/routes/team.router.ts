import * as express from 'express';
import TeamFactory from '../factory/team.factory';

const teamRouter = express.Router();
const teamFactory = new TeamFactory();
const teamController = teamFactory.controller();

teamRouter.get('/', teamController.getAllTeams);

teamRouter.get('/:id', teamController.getTeamById);

teamRouter.post('/', teamController.createTeam);

teamRouter.put('/:id', teamController.editTeam);

teamRouter.delete('/:id', teamController.deleteTeam);

export default teamRouter;
