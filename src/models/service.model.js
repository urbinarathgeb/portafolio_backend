import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class Service extends Model {}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El título es obligatorio' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La descripción es obligatoria' },
    },
  },
  icon: {
    type: DataTypes.STRING(100),
  },
}, {
  sequelize,
  modelName: 'Service',
  tableName: 'services',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default Service;
