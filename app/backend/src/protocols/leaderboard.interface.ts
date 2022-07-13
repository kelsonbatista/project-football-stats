import IMatch from './match.interface';
import ITeam from './team.interface';

export default interface ILBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency?: number;
}

export interface ITeamMatch extends ITeam {
  homeMatches: IMatch[];
  awayMatches: IMatch[];
}

export interface ILBoardService {
  getMatches(homeAwayTeam: string): Promise<ITeamMatch[]>
  getLeaderboard(team: string, order: boolean): Promise<ILBoard[]>;
  getLeaderboardTotal(): Promise<ILBoard[]>
}

export interface ILBoardModel {
  getMatches(homeAwayTeam: string): Promise<ITeamMatch[]>
  getLeaderboard(team: string, order: boolean): Promise<ILBoard[]>;
  getLeaderboardTotal(): Promise<ILBoard[]>
}
