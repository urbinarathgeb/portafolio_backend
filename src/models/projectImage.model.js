import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class ProjectImage extends Model {}

ProjectImage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'El ID del proyecto debe ser un número entero' },
    },
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  publicId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING(20),
  },
  bytes: {
    type: DataTypes.INTEGER,
  },
  isPreview: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'ProjectImage',
  tableName: 'project_images',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default ProjectImage;
