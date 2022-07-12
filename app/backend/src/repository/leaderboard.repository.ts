import ILBoard, { ITeamMatch, ILBoardModel } from '../protocols/leaderboard.interface';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import teamData from '../utils/leaderboard.functions';

export default class LBoardRepository implements ILBoardModel {
  constructor(
    private matchModel = MatchModel,
    private teamModel = TeamModel,
  ) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public async getMatches(homeAwayTeam: string): Promise<ITeamMatch[]> {
    const homeAway = homeAwayTeam === 'home' ? 'homeMatches' : 'awayMatches';
    const teamMatches = await this.teamModel.findAll({
      include: {
        model: this.matchModel,
        as: homeAway,
        where: { inProgress: 0 },
      },
      // raw: true,
    });
    return teamMatches as unknown as ITeamMatch[];
  }

  public async getLeaderboard(homeAwayTeam: string): Promise<ILBoard[]> {
    const matches = await this.getMatches(homeAwayTeam);
    const leaderboard = matches.map((team) => {
      const teamInfo = teamData(team);
      return {
        name: team.teamName,
        ...teamInfo,
        goalsBalance: teamInfo.goalsFavor - teamInfo.goalsOwn,
        efficiency: Number((teamInfo.totalPoints / ((teamInfo.totalGames * 3) / 100)).toFixed(2)),
      };
    });

    leaderboard.sort((a: ILBoard, b: ILBoard) => (
      b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn
    ));

    return leaderboard as unknown as ILBoard[];
  }
}
