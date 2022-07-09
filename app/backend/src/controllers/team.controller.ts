import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamService } from '../protocols/team.interface';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  public getAllTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getAllTeams();
      res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(id);
      if (!team) {
        const error = new Error('Team not found');
        error.name = 'NOT_FOUND';
        throw error;
      }
      return res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  };

  public createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const team = req.body;
      const teamExists = await this.service.checkTeam(team);
      if (teamExists) {
        const error = new Error('Team already exists');
        error.name = 'CONFLICT';
        throw error;
      }
      const result = await this.service.createTeam(team);
      return res.status(StatusCodes.CREATED).json({ ...result });
    } catch (err) {
      next(err);
    }
  };

  public editTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const teamInfo = req.body;
      const team = await this.service.editTeam(id, teamInfo);
      return res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  };

  public deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.deleteTeam(id);
      return res.status(StatusCodes.NO_CONTENT).json({ message: 'Team successfully deleted' });
    } catch (err) {
      next(err);
    }
  };
}
