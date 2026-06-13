import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import env from '../config/env.config.js';
import { AuthenticationError } from '../utils/errors.js';

export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AuthenticationError('Credenciales inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Credenciales inválidas');
  }

  const payload = { id: user.id, email: user.email, name: user.name };
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

  return { token, user: payload };
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
