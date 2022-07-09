import TeamController from '../controllers/team.controller';
import TeamRepository from '../repository/team.repository';
import TeamService from '../services/team.service';

export default class TeamFactory {
  public service = () => {
    const model = new TeamRepository();
    const service = new TeamService(model);
    return service;
  };

  public controller = () => {
    const model = new TeamRepository();
    const service = new TeamService(model);
    const controller = new TeamController(service);
    return controller;
  };
}
