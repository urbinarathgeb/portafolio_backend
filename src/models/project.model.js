import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/db.config.js'

class Project extends Model {
}

Project.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING(200),
		allowNull: false
	},
	subtitle: {
		type: DataTypes.STRING(200),
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	imagePreview: {
		type: DataTypes.STRING(255)
	},
	githubURL: {
		type: DataTypes.STRING(255)
	},
	deployURL: {
		type: DataTypes.STRING(255)
	},
	isFeatured: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'Project',
	tableName: 'projects',
	timestamps: true,
	underscored: true,
	paranoid: true
});

export default Project;