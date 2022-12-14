export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: number;
}

export interface IMatchService {
  getAllMatches(filters: object): Promise<IMatch[]>;
  getMatchById(id: string): Promise<IMatch>;
  checkMatch(match: IMatch): Promise<IMatch>;
  createMatch(match: IMatch): Promise<IMatch>;
  editMatch(id: string, match: IMatch): Promise<IMatch>;
  finishMatch(id: string): Promise<IMatch>;
  deleteMatch(id: string): Promise<void>;
}

export interface IMatchModel {
  getAllMatches(filters: object): Promise<IMatch[]>;
  getMatchById(id: string): Promise<IMatch>;
  checkMatch(match: IMatch): Promise<IMatch>;
  createMatch(match: IMatch): Promise<IMatch>;
  editMatch(id: string, match: IMatch): Promise<IMatch>;
  finishMatch(id: string): Promise<IMatch>;
  deleteMatch(id: string): Promise<void>;
}
