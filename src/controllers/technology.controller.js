import * as technologyService from '../services/technology.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const list = asyncHandler(async (_req, res) => {
  const technologies = await technologyService.getAll();
  return success(res, { message: 'Tecnologías obtenidas correctamente', data: technologies });
});

export const detail = asyncHandler(async (req, res) => {
  const technology = await technologyService.getById(req.params.id);
  return success(res, { message: 'Tecnología obtenida correctamente', data: technology });
});

export const create = asyncHandler(async (req, res) => {
  const technology = await technologyService.create(req.body);
  return success(res, { message: 'Tecnología creada correctamente', data: technology, status: 201 });
});

export const update = asyncHandler(async (req, res) => {
  const technology = await technologyService.update(req.params.id, req.body);
  return success(res, { message: 'Tecnología actualizada correctamente', data: technology });
});

export const remove = asyncHandler(async (req, res) => {
  await technologyService.remove(req.params.id);
  return success(res, { message: 'Tecnología eliminada correctamente' });
});
