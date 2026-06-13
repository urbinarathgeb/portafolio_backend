import { required } from './rules.js';

export const loginSchema = {
  email: [required],
  password: [required],
};
