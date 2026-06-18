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
  company: {
    type: DataTypes.STRING(200),
  },
  interest: {
    type: DataTypes.STRING(50),
    validate: {
      isIn(value) {
        const allowed = ['fulltime', 'freelance', 'consultoria', 'saludar'];
        if (value !== null && value !== undefined && value !== '' && !allowed.includes(value)) {
          throw new Error('El interés debe ser uno de: fulltime, freelance, consultoria, saludar');
        }
      },
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
