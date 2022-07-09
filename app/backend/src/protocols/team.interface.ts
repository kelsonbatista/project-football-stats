export default interface ITeam {
  id?: number;
  teamName: string;
}

export interface ITeamService {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: string): Promise<ITeam>;
  checkTeam(team: ITeam): Promise<ITeam>;
  createTeam(team: ITeam): Promise<ITeam>;
  editTeam(id: string, team: ITeam): Promise<ITeam>;
  deleteTeam(id: string): Promise<void>;
}

export interface ITeamModel {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: string): Promise<ITeam>;
  checkTeam(team: ITeam): Promise<ITeam>;
  createTeam(team: ITeam): Promise<ITeam>;
  editTeam(id: string, team: ITeam): Promise<ITeam>;
  deleteTeam(id: string): Promise<void>;
}
