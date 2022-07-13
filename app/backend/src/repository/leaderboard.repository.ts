import { zip } from 'lodash';
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

  public async getLeaderboard(homeAwayTeam: string, order: boolean): Promise<ILBoard[]> {
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

    const lb = (order === true)
      ? leaderboard.sort((a: ILBoard, b: ILBoard) => a.name.localeCompare(b.name))
      : leaderboard.sort((a: ILBoard, b: ILBoard) => (
        b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn
      ));

    return lb as unknown as ILBoard[];
  }

  public async getLeaderboardTotal(): Promise<ILBoard[]> {
    const matchesHome = await this.getLeaderboard('home', true);
    const matchesAway = await this.getLeaderboard('away', true);
    const board: any = zip(matchesHome, matchesAway).map(([team1, team2]) => ({
      name: team1!.name,
      totalPoints: team1!.totalPoints + team2!.totalPoints,
      totalGames: team1!.totalGames + team2!.totalGames,
      totalVictories: team1!.totalVictories + team2!.totalVictories,
      totalDraws: team1!.totalDraws + team2!.totalDraws,
      totalLosses: team1!.totalLosses + team2!.totalLosses,
      goalsFavor: team1!.goalsFavor + team2!.goalsFavor,
      goalsOwn: team1!.goalsOwn + team2!.goalsOwn,
      goalsBalance: team1!.goalsBalance + team2!.goalsBalance,
      efficiency: Number((((team1!.totalPoints + team2!.totalPoints) / 2)
        / ((((team1!.totalGames + team2!.totalGames) / 2) * 3) / 100)).toFixed(2)),
    }));
    board.sort((a: ILBoard, b: ILBoard) => (b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn));
    return board as unknown as ILBoard[];
  }
}
