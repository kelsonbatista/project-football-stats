import 'dotenv/config';
import IMatch, { IMatchModel, IMatchService } from '../protocols/match.interface';
import { ITeamService } from '../protocols/team.interface';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel, private teamService: ITeamService) {
    this.model = model;
    this.teamService = teamService;
  }

  public async getAllMatches(filters: object): Promise<IMatch[]> {
    const result = await this.model.getAllMatches(filters);
    return result;
  }

  public async getMatchById(id: string): Promise<IMatch> {
    const match = await this.model.getMatchById(id);
    return match;
  }

  public async checkMatch(match: IMatch): Promise<IMatch> {
    const matchCheck = await this.model.checkMatch(match);
    return matchCheck as IMatch;
  }

  public async createMatch(match: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam } = match;
    const getHomeTeam = homeTeam && await this.teamService.getTeamById(homeTeam.toString());
    const getAwayTeam = awayTeam && await this.teamService.getTeamById(awayTeam.toString());
    if (!getHomeTeam || !getAwayTeam) {
      const error = new Error('There is no team with such id!');
      error.name = 'NOT_FOUND';
      throw error;
    }
    if (homeTeam === awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
    const result = await this.model.createMatch(match);
    return result as unknown as IMatch;
  }

  public async editMatch(id: string, match: IMatch): Promise<IMatch> {
    const result = await this.model.editMatch(id, match);
    return result as IMatch;
  }

  public async finishMatch(id: string): Promise<IMatch> {
    const result = await this.model.finishMatch(id);
    return result as IMatch;
  }

  public async deleteMatch(id: string): Promise<void> {
    await this.model.deleteMatch(id);
  }
}
