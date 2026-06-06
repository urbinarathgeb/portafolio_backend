import * as projectService from '../services/project.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const list = asyncHandler(async (_req, res) => {
	const projects = await projectService.getAll();
	return success(res, {
		message: 'Proyectos obtenidos correctamente',
		data: projects,
	});
});

export const detail = asyncHandler(async (req, res) => {
	const project = await projectService.getById(req.params.id);
	return success(res, {
		message: 'Proyecto obtenido correctamente',
		data: project,
	});
});

export const create = asyncHandler(async (req, res) => {
	const project = await projectService.create(req.body);
	return success(res, {
		message: 'Proyecto creado correctamente',
		data: project,
		status: 201,
	});
});

export const update = asyncHandler(async (req, res) => {
	const project = await projectService.update(req.params.id, req.body);
	return success(res, {
		message: 'Proyecto actualizado correctamente',
		data: project,
	});
});

export const remove = asyncHandler(async (req, res) => {
	await projectService.remove(req.params.id);
	return success(res, {
		message: 'Proyecto eliminado correctamente',
		code: 'PROJECT_DELETED',
	});
});