import { Router } from 'express';
import * as projectImageController from '../controllers/projectImage.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validations/common.validation.js';

const router = Router();

router.get('/images', authenticate, projectImageController.listAll);
router.get('/projects/:id/images', authenticate, validate(idParamSchema, 'params'), projectImageController.listByProject);
router.post('/projects/:id/images', authenticate, validate(idParamSchema, 'params'), uploadSingleImage, projectImageController.upload);
router.patch('/images/:id/preview', authenticate, projectImageController.setPreview);

export default router;
