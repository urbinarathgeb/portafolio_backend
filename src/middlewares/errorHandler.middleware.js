import { AppError } from '../utils/errors.js';
import env from '../config/env.config.js';

export const errorHandler = (err, req, res, _next) => {
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