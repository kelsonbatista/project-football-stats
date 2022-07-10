import MatchController from '../controllers/match.controller';
import MatchRepository from '../repository/match.repository';
import MatchService from '../services/match.service';

export default class MatchFactory {
  public service = () => {
    const model = new MatchRepository();
    const service = new MatchService(model);
    return service;
  };

  public controller = () => {
    const model = new MatchRepository();
    const service = new MatchService(model);
    const controller = new MatchController(service);
    return controller;
  };
}
