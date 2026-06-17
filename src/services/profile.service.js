import User from '../models/user.model.js';
import { NotFoundError } from '../utils/errors.js';

const profileAttributes = { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] };

export const getProfile = async () => {
  const user = await User.findOne({ attributes: profileAttributes });
  if (!user) throw new NotFoundError('Perfil no encontrado');
  return user;
};

export const updateProfile = async (data) => {
  const user = await User.findOne();
  if (!user) throw new NotFoundError('Perfil no encontrado');
  await user.update(data);
  return await User.findOne({ attributes: profileAttributes });
};
