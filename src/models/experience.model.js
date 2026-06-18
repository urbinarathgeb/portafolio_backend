import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';
import ExperienceTechnology from './experienceTech.model.js';

class Experience extends Model {}

Experience.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El año es obligatorio' },
      isInt: { msg: 'El año debe ser un número entero' },
    },
  },
  role: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El rol es obligatorio' },
    },
  },
  company: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La empresa es obligatoria' },
    },
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La ubicación es obligatoria' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La descripción es obligatoria' },
    },
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Experience',
  tableName: 'experiences',
  timestamps: true,
  underscored: true,
  paranoid: true,
  hooks: {
    beforeDestroy: async (experience, options) => {
      const { transaction } = options;
      await ExperienceTechnology.destroy({
        where: { experienceId: experience.id },
        transaction,
      });
    },
  },
});

export default Experience;
