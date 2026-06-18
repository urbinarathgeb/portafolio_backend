import { required, isInt } from './rules.js';

export const idParamSchema = {
  id: [required, isInt],
};
