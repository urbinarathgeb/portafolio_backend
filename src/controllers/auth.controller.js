import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  return success(res, {
    message: 'Inicio de sesión exitoso',
    data: result,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, currentPassword, newPassword);
  return success(res, { message: 'Contraseña actualizada correctamente' });
});

export const about = asyncHandler(async (_req, res) => {
  return success(res, {
    message: 'Información de la API',
    data: {
      name: 'Portafolio API',
      version: '1.0.0',
      description: 'API REST del portafolio de Javier Urbina. Gestiona proyectos, servicios, mensajes de contacto y archivos multimedia.',
      author: 'Javier Urbina',
      endpoints: {
        public: ['POST /auth/login', 'GET /about', 'GET /profile', 'GET /projects', 'GET /projects/:id', 'GET /services', 'GET /services/:id', 'GET /experiences', 'GET /experiences/:id', 'GET /technologies', 'GET /technologies/:id'],
        private: ['PATCH /profile', 'PATCH /auth/password', 'POST /projects', 'PUT /projects/:id', 'DELETE /projects/:id', 'GET /contacts', 'PATCH /contacts/:id', 'POST /services', 'PUT /services/:id', 'DELETE /services/:id', 'POST /experiences', 'PUT /experiences/:id', 'DELETE /experiences/:id', 'POST /technologies', 'PUT /technologies/:id', 'DELETE /technologies/:id', 'GET /images', 'GET /projects/:id/images', 'POST /projects/:id/images'],
      },
    },
  });
});
