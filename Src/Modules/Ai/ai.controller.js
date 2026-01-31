import express from 'express';
// import * as aiController from './ai.controller.js'; 
import { uploadFile } from '../../Utils/Upload Files/multerUploadFile.js';
import { validation } from '../../MiddleWare/validation.middelware.js';
import { chatSchema } from './ai.validation.js';
import { asyncHandler } from './../../Utils/ErrorHandler/asyncHandler.js';
import { chat } from './ai.service.js';

const router = express.Router();
router.post('/chat', uploadFile().array('files', 3),validation(chatSchema),asyncHandler(chat));

export default router;