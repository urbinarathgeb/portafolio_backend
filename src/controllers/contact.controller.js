import * as contactService from '../services/contact.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const list = asyncHandler(async (_req, res) => {
  const contacts = await contactService.getAll();
  return success(res, {
    message: 'Mensajes obtenidos correctamente',
    data: contacts,
  });
});

export const create = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const contact = await contactService.create({ name, email, message });
  return success(res, {
    message: 'Mensaje enviado correctamente',
    data: contact,
    status: 201,
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await contactService.markAsRead(id);
  return success(res, {
    message: 'Mensaje marcado como leído',
    data: contact,
  });
});
