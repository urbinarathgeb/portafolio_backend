import { AppError } from '../utils/errors.js';

export const errorHandler = (err, req, res, _next) => {
	if (err instanceof AppError && err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			...(err.errors && { errors: err.errors }),
		});
	}

	console.error(err);
	res.status(500).json({
		status: 'error',
		message: 'Error interno del servidor',
	});
};