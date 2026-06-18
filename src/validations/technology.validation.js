import { required, isInt, optional, isIn, min } from './rules.js';

export const createTechnologySchema = {
  name: [required],
  category: [required],
  description: [optional(required)],
  icon: [optional(required)],
  span: [optional(isInt), optional(min(1))],
  order: [optional(isInt), optional(min(0))],
};

export const updateTechnologySchema = {
  name: [optional(required)],
  category: [optional(required)],
  description: [optional(required)],
  icon: [optional(required)],
  span: [optional(isInt), optional(min(1))],
  order: [optional(isInt), optional(min(0))],
};

export const technologiesQuerySchema = {
  stack: [optional(isIn(['true']))],
};
