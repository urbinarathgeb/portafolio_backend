import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class ExperienceTechnology extends Model {}

ExperienceTechnology.init({
  experienceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'experiences',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  technologyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'technologies',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'ExperienceTechnology',
  tableName: 'experience_technologies',
  timestamps: false,
  underscored: true,
});

export default ExperienceTechnology;
