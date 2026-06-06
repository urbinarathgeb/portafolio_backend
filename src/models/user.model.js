import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/db.config.js'

class User extends Model {
};

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},
	lastname: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El apellido es obligatorio'
			}
		}
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: 'El email debe ser válido'
			},
			notEmpty: {
				msg: 'El email es obligatorio'
			}
		}
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			len: {
				args: [8, 255],
				msg: 'La contraseña debe tener al menos 8 caracteres'
			}
		}
	},
}, {
	sequelize,
	modelName: 'User',
	tableName: 'users',
	timestamps: true,
	underscored: true,
	paranoid: true
});

export default User;