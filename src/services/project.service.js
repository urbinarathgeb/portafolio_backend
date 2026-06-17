import Project from '../models/project.model.js'
import User from '../models/user.model.js'
import ProjectImage from '../models/projectImage.model.js'
import Technology from '../models/technology.model.js'
import { NotFoundError } from '../utils/errors.js';

const defaultInclude = [
  { model: User, as: 'user', attributes: ['name', 'lastname'] },
  { model: ProjectImage, as: 'images' },
  { model: Technology, as: 'techStackDetails', through: { attributes: [] } },
];

export const getAll = async () => {
  return await Project.findAll({ include: defaultInclude });
}

export const getById = async (id) => {
  const project = await Project.findByPk(id, { include: defaultInclude });
  if (!project) throw new NotFoundError('Proyecto no encontrado');
  return project;
}

export const create = async (data) => {
  const { techIds, ...projectData } = data;
  const project = await Project.create(projectData);
  if (techIds && techIds.length > 0) {
    await project.setTechStackDetails(techIds);
  }
  return await getById(project.id);
}

export const update = async (id, data) => {
  const project = await Project.findByPk(id);
  if (!project) throw new NotFoundError('Proyecto no encontrado');
  const { techIds, ...projectData } = data;
  await project.update(projectData);
  if (techIds && techIds.length > 0) {
    await project.setTechStackDetails(techIds);
  }
  return await getById(id);
}

export const remove = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) throw new NotFoundError('Proyecto no encontrado');
  await project.destroy();
  return project;
}