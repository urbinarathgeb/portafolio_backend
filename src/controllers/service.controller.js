import * as serviceService from '../services/service.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const list = asyncHandler(async (_req, res) => {
  const services = await serviceService.getAll();
  return success(res, {
    message: 'Servicios obtenidos correctamente',
    data: services,
  });
});

export const detail = asyncHandler(async (req, res) => {
  const service = await serviceService.getById(req.params.id);
  return success(res, {
    message: 'Servicio obtenido correctamente',
    data: service,
  });
});

export const create = asyncHandler(async (req, res) => {
  const service = await serviceService.create(req.body);
  return success(res, {
    message: 'Servicio creado correctamente',
    data: service,
    status: 201,
  });
});

export const update = asyncHandler(async (req, res) => {
  const service = await serviceService.update(req.params.id, req.body);
  return success(res, {
    message: 'Servicio actualizado correctamente',
    data: service,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await serviceService.remove(req.params.id);
  return success(res, {
    message: 'Servicio eliminado correctamente',
  });
});
