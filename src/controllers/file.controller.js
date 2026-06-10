import * as fileService from '../services/file.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';
import { ValidationError } from '../utils/errors.js';

export const upload = asyncHandler(async (req, _res) => {
  if (!req.file) {
    throw new ValidationError('Debe seleccionar un archivo para subir');
  }

  const result = await fileService.uploadFile(req.file);
  return success(_res, {
    message: 'Archivo subido correctamente',
    data: result,
    status: 201,
  });
});

export const list = asyncHandler(async (_req, res) => {
  const files = await fileService.listFiles();
  return success(res, {
    message: 'Archivos obtenidos correctamente',
    data: files,
  });
});
