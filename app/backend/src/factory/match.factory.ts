import MatchController from '../controllers/match.controller';
import MatchRepository from '../repository/match.repository';
import MatchService from '../services/match.service';
import TeamFactory from './team.factory';

export default class MatchFactory {
  private teamService = new TeamFactory();
  private team = this.teamService.service();

  public service = () => {
    const model = new MatchRepository();
    const service = new MatchService(model, this.team);
    return service;
  };

  public controller = () => {
    const model = new MatchRepository();
    const service = new MatchService(model, this.team);
    const controller = new MatchController(service);
    return controller;
  };
}
