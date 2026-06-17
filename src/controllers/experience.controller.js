import * as experienceService from '../services/experience.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const list = asyncHandler(async (_req, res) => {
  const experiences = await experienceService.getAll();
  return success(res, { message: 'Experiencias obtenidas correctamente', data: experiences });
});

export const detail = asyncHandler(async (req, res) => {
  const experience = await experienceService.getById(req.params.id);
  return success(res, { message: 'Experiencia obtenida correctamente', data: experience });
});

export const create = asyncHandler(async (req, res) => {
  const experience = await experienceService.create(req.body);
  return success(res, { message: 'Experiencia creada correctamente', data: experience, status: 201 });
});

export const update = asyncHandler(async (req, res) => {
  const experience = await experienceService.update(req.params.id, req.body);
  return success(res, { message: 'Experiencia actualizada correctamente', data: experience });
});

export const remove = asyncHandler(async (req, res) => {
  await experienceService.remove(req.params.id);
  return success(res, { message: 'Experiencia eliminada correctamente' });
});
