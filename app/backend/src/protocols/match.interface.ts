export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

export interface IMatchService {
  getAllMatches(): Promise<IMatch[]>;
  getMatchById(id: string): Promise<IMatch>;
  checkMatch(match: IMatch): Promise<IMatch>;
  createMatch(match: IMatch): Promise<IMatch>;
  editMatch(id: string, match: IMatch): Promise<IMatch>;
  deleteMatch(id: string): Promise<void>;
}

export interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>;
  getMatchById(id: string): Promise<IMatch>;
  checkMatch(match: IMatch): Promise<IMatch>;
  createMatch(match: IMatch): Promise<IMatch>;
  editMatch(id: string, match: IMatch): Promise<IMatch>;
  deleteMatch(id: string): Promise<void>;
}
