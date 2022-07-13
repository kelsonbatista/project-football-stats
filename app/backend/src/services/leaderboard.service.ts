import 'dotenv/config';
import ILBoard, { ILBoardModel, ILBoardService, ITeamMatch }
  from '../protocols/leaderboard.interface';

export default class LBoardService implements ILBoardService {
  constructor(private model: ILBoardModel) {
    this.model = model;
  }

  public async getMatches(homeAwayTeam: string): Promise<ITeamMatch[]> {
    const teamMatches = await this.model.getMatches(homeAwayTeam);
    return teamMatches as ITeamMatch[];
  }

  public async getLeaderboard(homeAwayTeam: string, order: boolean): Promise<ILBoard[]> {
    const teamMatches = await this.model.getLeaderboard(homeAwayTeam, order);
    return teamMatches as ILBoard[];
  }

  public async getLeaderboardTotal(): Promise<ILBoard[]> {
    const teamMatches = await this.model.getLeaderboardTotal();
    return teamMatches as ILBoard[];
  }
}
