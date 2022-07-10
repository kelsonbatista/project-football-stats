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
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  as: 'teamHome',
  foreignKey: 'homeTeam',
});

MatchModel.belongsTo(TeamModel, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

// TeamModel.hasMany(MatchModel, {
//   as: 'homeMatches',
//   foreignKey: 'homeTeam',
// });

export default MatchModel;
