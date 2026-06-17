import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class Technology extends Model {}

Technology.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'El nombre es obligatorio' },
    },
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La categoría es obligatoria' },
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  icon: {
    type: DataTypes.STRING(100),
  },
  span: {
    type: DataTypes.INTEGER,
  },
  showInStack: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Technology',
  tableName: 'technologies',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default Technology;
