import User from '../models/user.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getProfile = async () => {
  const user = await User.findOne({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
  });
  if (!user) throw new NotFoundError('Perfil no encontrado');
  return user;
};

export const updateProfile = async (data) => {
  const user = await User.findOne();
  if (!user) throw new NotFoundError('Perfil no encontrado');
  return await user.update(data);
};
