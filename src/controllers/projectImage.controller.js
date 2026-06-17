import * as projectImageService from '../services/projectImage.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';
import { ValidationError } from '../utils/errors.js';

export const listAll = asyncHandler(async (_req, res) => {
  const images = await projectImageService.getAll();
  return success(res, {
    message: 'Imágenes obtenidas correctamente',
    data: images,
  });
});

export const listByProject = asyncHandler(async (req, res) => {
  const images = await projectImageService.getByProject(req.params.id);
  return success(res, {
    message: 'Imágenes del proyecto obtenidas correctamente',
    data: images,
  });
});

export const upload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('Debe seleccionar una imagen para subir');
  }

  const image = await projectImageService.uploadImage(req.params.id, req.file);
  return success(res, {
    message: 'Imagen subida correctamente',
    data: image,
    status: 201,
  });
});

export const setPreview = asyncHandler(async (req, res) => {
  const image = await projectImageService.setPreview(req.params.id, req.body.isPreview);
  return success(res, {
    message: image.isPreview ? 'Imagen establecida como preview' : 'Preview eliminado',
    data: image,
  });
});
