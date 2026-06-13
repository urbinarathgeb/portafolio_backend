import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class Contact extends Model {}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre es obligatorio' },
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: { msg: 'El email debe ser válido' },
      notEmpty: { msg: 'El email es obligatorio' },
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El mensaje es obligatorio' },
    },
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Contact',
  tableName: 'contacts',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default Contact;
