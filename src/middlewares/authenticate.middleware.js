import { verifyToken } from '../services/auth.service.js';
import { AuthenticationError } from '../utils/errors.js';

export const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Token de acceso no proporcionado');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AuthenticationError('Token inválido o expirado');
  }
};
