import Contact from '../models/contact.model.js';
import { NotFoundError } from '../utils/errors.js';
import { sendContactNotification } from './email.service.js';

export const getAll = async () => {
  return await Contact.findAll({
    order: [['createdAt', 'DESC']],
  });
};

export const create = async (data) => {
  const contact = await Contact.create(data);
  sendContactNotification(contact).catch(() => {});
  return contact;
};

export const markAsRead = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) throw new NotFoundError('Mensaje no encontrado');
  return await contact.update({ isRead: true });
};
