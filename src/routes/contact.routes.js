import { Router } from 'express';
import * as contactController from '../controllers/contact.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { contactLimiter } from '../middlewares/rateLimiter.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createContactSchema } from '../validations/contact.validation.js';
import { idParamSchema } from '../validations/common.validation.js';

const router = Router();

router.get('/contacts', authenticate, contactController.list);
router.post('/contacts', contactLimiter, validate(createContactSchema), contactController.create);
router.patch('/contacts/:id', authenticate, validate(idParamSchema, 'params'), contactController.markAsRead);

export default router;
