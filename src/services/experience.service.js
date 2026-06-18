import Experience from '../models/experience.model.js';
import Technology from '../models/technology.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getAll = async () => {
  return await Experience.findAll({
    order: [['order', 'ASC'], ['year', 'DESC']],
    include: [
      { model: Technology, as: 'technologies', through: { attributes: [] } },
    ],
  });
};

export const getById = async (id) => {
  const experience = await Experience.findByPk(id, {
    include: [
      { model: Technology, as: 'technologies', through: { attributes: [] } },
    ],
  });
  if (!experience) throw new NotFoundError('Experiencia no encontrada');
  return experience;
};

export const create = async (data) => {
  const { techIds, ...experienceData } = data;
  const experience = await Experience.create(experienceData);
  if (techIds !== undefined) {
    await experience.setTechnologies(techIds);
  }
  return await getById(experience.id);
};

export const update = async (id, data) => {
  const experience = await Experience.findByPk(id);
  if (!experience) throw new NotFoundError('Experiencia no encontrada');
  const { techIds, ...experienceData } = data;
  await experience.update(experienceData);
  if (techIds !== undefined) {
    await experience.setTechnologies(techIds);
  }
  return await getById(id);
};

export const remove = async (id) => {
  const experience = await Experience.findByPk(id);
  if (!experience) throw new NotFoundError('Experiencia no encontrada');
  await experience.destroy();
  return experience;
};
