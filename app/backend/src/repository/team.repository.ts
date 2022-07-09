import ITeam, { ITeamModel } from '../protocols/team.interface';
import TeamModel from '../database/models/team.model';

export default class TeamRepository implements ITeamModel {
  constructor(private model = TeamModel) {
    this.model = model;
  }

  public async getAllTeams(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async getTeamById(id: string): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    return team as ITeam;
  }

  public async checkTeam(team: ITeam): Promise<ITeam> {
    const teamCheck = await this.model
      .findOne({ where: { ...team } });
    return teamCheck as ITeam;
  }

  public async createTeam(team: ITeam): Promise<ITeam> {
    const response = await this.model.create(team).then((result) => result.toJSON());
    return response as ITeam;
  }

  public async editTeam(id: string, team: ITeam): Promise<ITeam> {
    const result = await this.model.update({ id, ...team }, { where: { id } });
    return result as unknown as ITeam;
  }

  public async deleteTeam(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
