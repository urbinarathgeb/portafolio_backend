import * as profileService from '../services/profile.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

export const get = asyncHandler(async (_req, res) => {
  const profile = await profileService.getProfile();
  return success(res, { message: 'Perfil obtenido correctamente', data: profile });
});

export const update = asyncHandler(async (req, res) => {
  const profile = await profileService.updateProfile(req.body);
  return success(res, { message: 'Perfil actualizado correctamente', data: profile });
});
