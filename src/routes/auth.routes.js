import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, changePasswordSchema } from '../validations/auth.validation.js';

const router = Router();

router.post('/auth/login', validate(loginSchema), authController.login);
router.get('/about', authController.about);
router.patch('/auth/password', authenticate, validate(changePasswordSchema), authController.changePassword);

export default router;
