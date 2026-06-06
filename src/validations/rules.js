export const required = (field, value) => {
	if (value === undefined || value === null || String(value).trim() === '') {
		return { field, message: `El campo ${field} es obligatorio` };
	}
	return null;
};

export const isUrl = (field, value) => {
	if (value && !URL.canParse(value)) {
		return { field, message: `${field} debe ser una URL válida` };
	}
	return null;
};

export const isInt = (field, value) => {
	if (value && !Number.isInteger(Number(value))) {
		return { field, message: `${field} debe ser un número entero` };
	}
	return null;
};

export const optional = (rule) => (field, value, data) => {
	if (value === undefined || value === null || value === '') return null;
	return rule(field, value, data);
};