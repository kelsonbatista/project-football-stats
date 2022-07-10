import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchService } from '../protocols/match.interface';

export default class MatchController {
  constructor(
    private service: IMatchService,
  ) {
    this.service = service;
  }

  public getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.getAllMatches();
      return res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  };

  public getMatchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const match = await this.service.getMatchById(id);
      if (!match) {
        const error = new Error('Match not found');
        error.name = 'NOT_FOUND';
        throw error;
      }
      return res.status(StatusCodes.OK).json({ match });
    } catch (err) {
      next(err);
    }
  };

  public createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = req.body;
      const matchExists = await this.service.checkMatch(match);
      if (matchExists) {
        const error = new Error('Match already exists');
        error.name = 'CONFLICT';
        throw error;
      }
      const result = await this.service.createMatch(match);
      return res.status(StatusCodes.CREATED).json({ ...result });
    } catch (err) {
      next(err);
    }
  };

  public editMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const matchInfo = req.body;
      const match = await this.service.editMatch(id, matchInfo);
      return res.status(StatusCodes.OK).json(match);
    } catch (err) {
      next(err);
    }
  };

  public deleteMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.deleteMatch(id);
      return res.status(StatusCodes.NO_CONTENT).json({ message: 'Match successfully deleted' });
    } catch (err) {
      next(err);
    }
  };
}
