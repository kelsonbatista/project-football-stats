import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'team',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'team',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'homeTeam',
  as: 'homeMatches',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'awayTeam',
  as: 'awayMatches',
});

export default MatchModel;
