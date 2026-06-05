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
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
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