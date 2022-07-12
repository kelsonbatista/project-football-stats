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

  public async getLeaderboard(homeAwayTeam: string): Promise<ILBoard[]> {
    const teamMatches = await this.model.getLeaderboard(homeAwayTeam);
    return teamMatches as ILBoard[];
  }
}
