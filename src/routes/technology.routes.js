import { Router } from 'express';
import * as technologyController from '../controllers/technology.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validations/common.validation.js';
import { createTechnologySchema, updateTechnologySchema, technologiesQuerySchema } from '../validations/technology.validation.js';

const router = Router();

router.get('/technologies', validate(technologiesQuerySchema, 'query'), technologyController.list);
router.get('/technologies/:id', validate(idParamSchema, 'params'), technologyController.detail);
router.post('/technologies', authenticate, validate(createTechnologySchema), technologyController.create);
router.put('/technologies/:id', authenticate, validate(idParamSchema, 'params'), validate(updateTechnologySchema), technologyController.update);
router.delete('/technologies/:id', authenticate, validate(idParamSchema, 'params'), technologyController.remove);

export default router;
