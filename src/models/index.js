import Project from './project.model.js';
import User from './user.model.js';
import Contact from './contact.model.js';
import Service from './service.model.js';
import ProjectImage from './projectImage.model.js';

User.hasMany(Project, {foreignKey: 'userId', as: 'projects'});
Project.belongsTo(User, {foreignKey: 'userId', as: 'user'});

Project.hasMany(ProjectImage, {foreignKey: 'projectId', as: 'images'});
ProjectImage.belongsTo(Project, {foreignKey: 'projectId', as: 'project'});

export {User, Project, Contact, Service, ProjectImage};