import { required, minLength } from './rules.js';

export const loginSchema = {
  email: [required],
  password: [required],
};

export const changePasswordSchema = {
  currentPassword: [required],
  newPassword: [required, minLength(8)],
};
