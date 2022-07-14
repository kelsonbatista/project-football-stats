import { Op } from 'sequelize';
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

  public async getAllMatches(filters: object): Promise<IMatch[]> {
    const inProgressKey = Object.keys(filters).find((key) => key === 'inProgress');
    const inProgressBool = inProgressKey && Object.entries(filters)
      .filter(([key, value]) => key === 'inProgress' && value === 'true');
    const inProgress: any = inProgressBool && inProgressBool.length > 0 ? 1 : 0;
    const progress = inProgressKey
      ? { inProgress }
      : { [Op.or]: [{ inProgress: 1 }, { inProgress: 0 }] };
    const result = await this.matchModel.findAll(
      { where: { ...filters, ...progress },
        include: [
          { model: this.teamModel, attributes: ['teamName'], as: 'teamHome' },
          { model: this.teamModel, attributes: ['teamName'], as: 'teamAway' },
        ],
      },
    );
    return result as IMatch[];
  }

  public async getMatchById(id: string): Promise<IMatch> {
    const match = await this.matchModel.findByPk(id, { raw: true });
    return match as IMatch;
  }

  public async checkMatch(match: IMatch): Promise<IMatch> {
    const matchCheck = await this.matchModel
      .findOne({ where: { ...match } });
    return matchCheck as IMatch;
  }

  public async createMatch(match: IMatch): Promise<IMatch> {
    const newMatch = { ...match, inProgress: 1 };
    const response = await this.matchModel.create(newMatch).then((result) => result.toJSON());
    return response as IMatch;
  }

  public async editMatch(id: string, match: IMatch): Promise<IMatch> {
    const result = await this.matchModel.update({ id, ...match }, { where: { id } });
    return result as unknown as IMatch;
  }

  public async finishMatch(id: string): Promise<IMatch> {
    const result = await this.matchModel.update({ inProgress: 0 }, { where: { id } });
    return result as unknown as IMatch;
  }

  public async deleteMatch(id: string): Promise<void> {
    await this.matchModel.destroy({ where: { id } });
  }
}
