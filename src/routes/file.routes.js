import { Router } from 'express';
import * as fileController from '../controllers/file.controller.js';
import { uploadSingle } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/', uploadSingle, fileController.upload);
router.get('/', fileController.list);

export default router;
