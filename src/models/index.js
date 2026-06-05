import Project from './project.model.js';
import User from './user.model.js';

User.hasMany(Project, {foreignKey: 'userId', as: 'projects'});
Project.belongsTo(User, {foreignKey: 'userId', as: 'user'});

export {User, Project};