import { ValidationError } from '../utils/errors.js';

export const validate = (schema, source = 'body') => (req, res, next) => {
	const errors = [];
	const data = source === 'params' ? req.params : req.body;

	for (const [field, rules] of Object.entries(schema)) {
		for (const rule of rules) {
			const error = rule(field, data[field], data);
			if (error) errors.push(error);
		}
	}

	if (errors.length === 0) return next();
	next(new ValidationError('Error de validación', errors));
};