import Contact from '../models/contact.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getAll = async () => {
  return await Contact.findAll({
    order: [['createdAt', 'DESC']],
  });
};

export const create = async (data) => {
  return await Contact.create(data);
};

export const markAsRead = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) throw new NotFoundError('Mensaje no encontrado');
  return await contact.update({ isRead: true });
};
