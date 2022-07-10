import IMatch, { IMatchModel } from '../protocols/match.interface';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

export default class MatchRepository implements IMatchModel {
  constructor(
    private matchModel = MatchModel,
    private teamModel = TeamModel,
  ) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public async getAllMatches(): Promise<IMatch[]> {
    const result = await this.matchModel.findAll({
      include: [
        { model: this.teamModel, attributes: ['teamName'], as: 'teamHome' },
        { model: this.teamModel, attributes: ['teamName'], as: 'teamAway' },
      ],
    });
    return result as IMatch[];
  }

  public async getMatchById(id: string): Promise<IMatch> {
    const match = await this.matchModel.findByPk(id);
    return match as IMatch;
  }

  public async checkMatch(match: IMatch): Promise<IMatch> {
    const matchCheck = await this.matchModel
      .findOne({ where: { ...match } });
    return matchCheck as IMatch;
  }

  public async createMatch(match: IMatch): Promise<IMatch> {
    const response = await this.matchModel.create(match).then((result) => result.toJSON());
    return response as IMatch;
  }

  public async editMatch(id: string, match: IMatch): Promise<IMatch> {
    const result = await this.matchModel.update({ id, ...match }, { where: { id } });
    return result as unknown as IMatch;
  }

  public async deleteMatch(id: string): Promise<void> {
    await this.matchModel.destroy({ where: { id } });
  }
}
