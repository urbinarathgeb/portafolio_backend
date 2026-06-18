import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class ProjectTechnology extends Model {}

ProjectTechnology.init({
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
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
  modelName: 'ProjectTechnology',
  tableName: 'project_technologies',
  timestamps: false,
  underscored: true,
});

export default ProjectTechnology;
