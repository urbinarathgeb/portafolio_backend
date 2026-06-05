import { NotFoundError } from '../utils/errors.js';

export const notFound = (_req, _res, next) => {
	next(new NotFoundError('Ruta no encontrada'));
};