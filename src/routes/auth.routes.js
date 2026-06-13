import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema } from '../validations/auth.validation.js';

const router = Router();

router.post('/auth/login', validate(loginSchema), authController.login);
router.get('/about', authController.about);

export default router;
