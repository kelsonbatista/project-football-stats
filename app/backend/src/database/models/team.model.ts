import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  public id!: number;
  public teamName!: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;
