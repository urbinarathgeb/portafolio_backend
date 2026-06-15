import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createProjectSchema, updateProjectSchema, idParamSchema } from '../validations/project.validation.js';

const router = Router();

router.get('/projects', projectController.list);
router.get('/projects/:id', validate(idParamSchema, 'params'), projectController.detail);
router.post('/projects', authenticate, validate(createProjectSchema), projectController.create);
router.put('/projects/:id', authenticate, validate(idParamSchema, 'params'), validate(updateProjectSchema), projectController.update);
router.delete('/projects/:id', authenticate, validate(idParamSchema, 'params'), projectController.remove);

export default router;