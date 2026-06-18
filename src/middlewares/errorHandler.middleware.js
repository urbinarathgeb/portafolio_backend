import { AppError } from '../utils/errors.js';
import env from '../config/env.config.js';

const MULTER_ERROR_MESSAGES = {
  LIMIT_FILE_SIZE: 'El archivo excede el tamaño máximo permitido de 2MB',
  LIMIT_FILE_COUNT: 'Demasiados archivos',
  LIMIT_UNEXPECTED_FILE: 'Tipo de archivo inesperado',
  LIMIT_FIELD_KEY: 'Nombre de campo demasiado largo',
  LIMIT_FIELD_VALUE: 'Valor de campo demasiado largo',
  LIMIT_FIELD_COUNT: 'Demasiados campos',
  LIMIT_PART_COUNT: 'Demasiadas partes en la solicitud',
};

export const errorHandler = (err, req, res, _next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({
      status: 'error',
      message: MULTER_ERROR_MESSAGES[err.code] || 'Error al subir el archivo',
    });
  }

  if (err.name === 'FileFilterError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Error de validación',
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 'error',
      message: 'Recurso duplicado',
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  console.error(err);

  const isDev = env.NODE_ENV === 'development';

  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    ...(isDev && { detail: err.message, stack: err.stack }),
  });
};