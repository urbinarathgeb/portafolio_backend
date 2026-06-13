import Project from '../models/project.model.js'
import User from '../models/user.model.js'
import ProjectImage from '../models/projectImage.model.js'
import { NotFoundError } from '../utils/errors.js';

export const getAll = async () => {
  return await Project.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'lastname']
      },
      {
        model: ProjectImage,
        as: 'images',
      }
    ]
  })
}

export const getById = async (id) => {
  const project = await Project.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'lastname']
      },
      {
        model: ProjectImage,
        as: 'images',
      }
    ]
  })

  if (!project) throw new NotFoundError('Proyecto no encontrado')
  return project
}

export const create = async (data) => {
  return await Project.create(data)
}

export const update = async (id, data) => {
  const project = await Project.findByPk(id)
  if (!project) throw new NotFoundError('Proyecto no encontrado')

  return await project.update(data)
}

export const remove = async (id) => {
  const project = await Project.findByPk(id)
  if (!project) throw new NotFoundError('Proyecto no encontrado')

  await project.destroy()
  return project
}