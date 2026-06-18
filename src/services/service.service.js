import Service from '../models/service.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getAll = async () => {
  return await Service.findAll({ order: [['createdAt', 'DESC']] });
};

export const getById = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) throw new NotFoundError('Servicio no encontrado');
  return service;
};

export const create = async (data) => {
  return await Service.create(data);
};

export const update = async (id, data) => {
  const service = await Service.findByPk(id);
  if (!service) throw new NotFoundError('Servicio no encontrado');
  return await service.update(data);
};

export const remove = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) throw new NotFoundError('Servicio no encontrado');
  await service.destroy();
  return service;
};
