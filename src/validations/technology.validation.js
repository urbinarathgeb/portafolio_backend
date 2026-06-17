import { required, isInt, optional } from './rules.js';

export const createTechnologySchema = {
  name: [required],
  category: [required],
  description: [optional(required)],
  icon: [optional(required)],
  span: [optional(isInt)],
};

export const updateTechnologySchema = {
  name: [optional(required)],
  category: [optional(required)],
  description: [optional(required)],
  icon: [optional(required)],
  span: [optional(isInt)],
};

export const idParamSchema = { id: [required, isInt] };
