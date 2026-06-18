import Project from './project.model.js';
import User from './user.model.js';
import Contact from './contact.model.js';
import Service from './service.model.js';
import ProjectImage from './projectImage.model.js';
import Experience from './experience.model.js';
import ExperienceTechnology from './experienceTech.model.js';
import Technology from './technology.model.js';
import ProjectTechnology from './projectTech.model.js';

User.hasMany(Project, {foreignKey: 'userId', as: 'projects'});
Project.belongsTo(User, {foreignKey: 'userId', as: 'user'});

Project.hasMany(ProjectImage, {foreignKey: 'projectId', as: 'images'});
ProjectImage.belongsTo(Project, {foreignKey: 'projectId', as: 'project'});

// Experience ↔ Technology (M:N)
Experience.belongsToMany(Technology, {
  through: ExperienceTechnology,
  foreignKey: 'experienceId',
  otherKey: 'technologyId',
  as: 'technologies',
});
Technology.belongsToMany(Experience, {
  through: ExperienceTechnology,
  foreignKey: 'technologyId',
  otherKey: 'experienceId',
  as: 'experiences',
});

// Project ↔ Technology (M:N)
Project.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: 'projectId',
  otherKey: 'technologyId',
  as: 'techStackDetails',
});
Technology.belongsToMany(Project, {
  through: ProjectTechnology,
  foreignKey: 'technologyId',
  otherKey: 'projectId',
  as: 'projects',
});

export {
  User,
  Project,
  Contact,
  Service,
  ProjectImage,
  Experience,
  ExperienceTechnology,
  Technology,
  ProjectTechnology,
};