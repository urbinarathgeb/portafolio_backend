import { required, isEmail, optional, isIn } from './rules.js';

const INTEREST_VALUES = ['fulltime', 'freelance', 'consultoria', 'saludar'];

export const createContactSchema = {
  name: [required],
  email: [required, isEmail],
  message: [required],
  company: [optional(required)],
  interest: [optional(isIn(INTEREST_VALUES))],
};
