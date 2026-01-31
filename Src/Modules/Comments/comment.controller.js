import { Router } from "express";
import authentication from './../../MiddleWare/authentication.middelware.js';
import { asyncHandler } from './../../Utils/ErrorHandler/asyncHandler.js';
import {  uploadFile } from './../../Utils/Upload Files/multerUploadFile.js';
import { validation } from './../../MiddleWare/validation.middelware.js';
import * as commentSchema from "./comment.validation.js"
import { endpoinedComment } from "./comment.endpoined.js";
import { authorization } from './../../MiddleWare/autherization.middelware.js';
import * as commentServices from "./comment.service.js";

const router=Router({mergeParams:true})

router.post("/:postId",authentication,authorization(endpoinedComment.createComment),uploadFile().single("image"),validation(commentSchema.createSchema),asyncHandler(commentServices.createComment))

router.patch("/:commentId",authentication,authorization(endpoinedComment.updateComment),uploadFile().single("image"),validation(commentSchema.updateSchema),asyncHandler(commentServices.updateComment))

// ============ get single comment ============
router.get("/",authentication,authorization(endpoinedComment.getSingle),validation(commentSchema.getSingle),asyncHandler(commentServices.getSingleComment))
// ================= get all comment =====================
router.get("/all",authentication,authorization(endpoinedComment.getAll),asyncHandler(commentServices.getAllComment))
// ================== delete comment ============
export default router