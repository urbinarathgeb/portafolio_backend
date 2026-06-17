import { required, isInt, isArray, isArrayOf, optional } from './rules.js';

export const createExperienceSchema = {
  year: [required, isInt],
  role: [required],
  company: [required],
  location: [required],
  description: [required],
  order: [optional(isInt)],
  techIds: [optional(isArray), optional(isArrayOf(isInt))],
};

export const updateExperienceSchema = {
  year: [optional(required), optional(isInt)],
  role: [optional(required)],
  company: [optional(required)],
  location: [optional(required)],
  description: [optional(required)],
  order: [optional(isInt)],
  techIds: [optional(isArray), optional(isArrayOf(isInt))],
};

export const idParamSchema = { id: [required, isInt] };
