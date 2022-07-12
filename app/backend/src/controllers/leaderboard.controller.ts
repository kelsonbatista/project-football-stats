import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILBoardService } from '../protocols/leaderboard.interface';

export default class LBoardController {
  constructor(private service: ILBoardService) {
    this.service = service;
  }

  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeAwayTeam } = req.params;
      const teamMatches = await this.service.getMatches(homeAwayTeam);
      res.status(StatusCodes.OK).json(teamMatches);
    } catch (err) {
      next(err);
    }
  };

  public getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeAwayTeam } = req.params;
      const teamMatches = await this.service.getLeaderboard(homeAwayTeam);
      res.status(StatusCodes.OK).json(teamMatches);
    } catch (err) {
      next(err);
    }
  };
}
