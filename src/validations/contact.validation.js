import { required, isEmail } from './rules.js';

export const createContactSchema = {
  name: [required],
  email: [required, isEmail],
  message: [required],
};
