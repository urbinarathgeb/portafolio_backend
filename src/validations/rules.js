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

export const isEmail = (field, value) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { field, message: `${field} debe ser un email válido` };
  }
  return null;
};

export const isIn = (allowedValues) => (field, value) => {
  if (value !== undefined && value !== null && value !== '' && !allowedValues.includes(value)) {
    return { field, message: `${field} debe ser uno de: ${allowedValues.join(', ')}` };
  }
  return null;
};

export const isArray = (field, value) => {
  if (value !== undefined && value !== null && !Array.isArray(value)) {
    return { field, message: `${field} debe ser un arreglo` };
  }
  return null;
};

export const isArrayOf = (typeValidator) => (field, value) => {
  if (value !== undefined && value !== null && Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const error = typeValidator(field, value[i]);
      if (error) return { field, message: `${field}[${i}]: ${error.message}` };
    }
  }
  return null;
};

export const minLength = (min) => (field, value) => {
  if (value !== undefined && value !== null && value !== '' && value.length < min) {
    return { field, message: `${field} debe tener al menos ${min} caracteres` };
  }
  return null;
};

export const min = (min) => (field, value) => {
  if (value !== undefined && value !== null && value !== '' && Number(value) < min) {
    return { field, message: `${field} debe ser mayor o igual a ${min}` };
  }
  return null;
};

export const optional = (rule) => (field, value, data) => {
  if (value === undefined || value === null || value === '') return null;
  return rule(field, value, data);
};

export const isJson = (field, value) => {
  if (value) {
    try {
      JSON.parse(value);
    } catch {
      return { field, message: `${field} debe ser un JSON válido` };
    }
  }
  return null;
};