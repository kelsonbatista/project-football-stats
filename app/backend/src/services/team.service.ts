import 'dotenv/config';
import ITeam, { ITeamModel, ITeamService } from '../protocols/team.interface';

export default class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  public async getAllTeams(): Promise<ITeam[]> {
    const result = await this.model.getAllTeams();
    return result;
  }

  public async getTeamById(id: string): Promise<ITeam> {
    const team = await this.model.getTeamById(id);
    return team;
  }

  public async checkTeam(team: ITeam): Promise<ITeam> {
    const teamCheck = await this.model.checkTeam(team);
    return teamCheck as ITeam;
  }

  public async createTeam(team: ITeam): Promise<ITeam> {
    const result = await this.model.createTeam(team);
    return result as unknown as ITeam;
  }

  public async editTeam(id: string, team: ITeam): Promise<ITeam> {
    const result = await this.model.editTeam(id, team);
    return result as ITeam;
  }

  public async deleteTeam(id: string): Promise<void> {
    await this.model.deleteTeam(id);
  }
}
