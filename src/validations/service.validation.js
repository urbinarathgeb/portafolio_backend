import { required, isInt, optional } from './rules.js';

export const createServiceSchema = {
  title: [required],
  description: [required],
};

export const updateServiceSchema = {
  title: [optional(required)],
  description: [optional(required)],
};


