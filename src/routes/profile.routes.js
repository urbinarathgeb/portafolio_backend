import { Router } from 'express';
import * as profileController from '../controllers/profile.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateProfileSchema } from '../validations/profile.validation.js';

const router = Router();

router.get('/profile', profileController.get);
router.patch('/profile', authenticate, validate(updateProfileSchema), profileController.update);

export default router;
