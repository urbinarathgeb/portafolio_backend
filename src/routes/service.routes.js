import { Router } from 'express';
import * as serviceController from '../controllers/service.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validations/common.validation.js';
import { createServiceSchema, updateServiceSchema } from '../validations/service.validation.js';

const router = Router();

router.get('/services', serviceController.list);
router.get('/services/:id', validate(idParamSchema, 'params'), serviceController.detail);
router.post('/services', authenticate, validate(createServiceSchema), serviceController.create);
router.put('/services/:id', authenticate, validate(idParamSchema, 'params'), validate(updateServiceSchema), serviceController.update);
router.delete('/services/:id', authenticate, validate(idParamSchema, 'params'), serviceController.remove);

export default router;
