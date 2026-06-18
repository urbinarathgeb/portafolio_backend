import { Router } from 'express';
import * as experienceController from '../controllers/experience.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validations/common.validation.js';
import { createExperienceSchema, updateExperienceSchema } from '../validations/experience.validation.js';

const router = Router();

router.get('/experiences', experienceController.list);
router.get('/experiences/:id', validate(idParamSchema, 'params'), experienceController.detail);
router.post('/experiences', authenticate, validate(createExperienceSchema), experienceController.create);
router.put('/experiences/:id', authenticate, validate(idParamSchema, 'params'), validate(updateExperienceSchema), experienceController.update);
router.delete('/experiences/:id', authenticate, validate(idParamSchema, 'params'), experienceController.remove);

export default router;
