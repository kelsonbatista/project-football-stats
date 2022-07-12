import LBoardController from '../controllers/leaderboard.controller';
import LBoardRepository from '../repository/leaderboard.repository';
import LBoardService from '../services/leaderboard.service';

export default class LBoardFactory {
  public service = () => {
    const model = new LBoardRepository();
    const service = new LBoardService(model);
    return service;
  };

  public controller = () => {
    const model = new LBoardRepository();
    const service = new LBoardService(model);
    const controller = new LBoardController(service);
    return controller;
  };
}
