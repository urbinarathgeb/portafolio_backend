import Technology from '../models/technology.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getAll = async (query = {}) => {
  const where = {};
  if (query.stack === 'true') where.showInStack = true;
  return await Technology.findAll({ where, order: [['order', 'ASC'], ['name', 'ASC']] });
};

export const getById = async (id) => {
  const technology = await Technology.findByPk(id);
  if (!technology) throw new NotFoundError('Tecnología no encontrada');
  return technology;
};

export const create = async (data) => {
  return await Technology.create(data);
};

export const update = async (id, data) => {
  const technology = await Technology.findByPk(id);
  if (!technology) throw new NotFoundError('Tecnología no encontrada');
  return await technology.update(data);
};

export const remove = async (id) => {
  const technology = await Technology.findByPk(id);
  if (!technology) throw new NotFoundError('Tecnología no encontrada');
  await technology.destroy();
  return technology;
};
