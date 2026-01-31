// ====================================== import modules =======================================
import { Router } from "express";
import { asyncHandler } from "../../Utils/ErrorHandler/asyncHandler.js";
import * as postServices from "./post.services.js";
import * as postSchema from "./post.validation.js"
import authentication from "../../MiddleWare/authentication.middelware.js";
import  {authorization}  from "../../MiddleWare/autherization.middelware.js";
import { endpoinedPosts } from "./post.endpoined.js";
import { uploadFile } from './../../Utils/Upload Files/multerUploadFile.js';
import { validation } from "../../MiddleWare/validation.middelware.js";
import routerComment from "../Comments/comment.controller.js";

const router=Router()
// ============================== start router (All Endpoined) ================================
router.use("/postId/comment",routerComment)

// ===============================   Create post =================
router.post("/createPost",authentication,authorization(endpoinedPosts.createPost),uploadFile().array("images",3),validation(postSchema.createSchema),asyncHandler(postServices.createPost))
// ===============================   update post =================
router.patch("/:postId",authentication,authorization(endpoinedPosts.updatePost),uploadFile().array("images",3),validation(postSchema.updateSchema),asyncHandler(postServices.updatePost))
// ===============================   soft delete post =================
router.patch("softdelete/:postId",authentication,authorization(endpoinedPosts.softDelete),validation(postSchema.softDeleteSchema),asyncHandler(postServices.softDeletePost))
router.patch("reset/:id",authentication,authorization(endpoinedPosts.resetPost),validation(postSchema.resetSchema),asyncHandler(postServices.resetPost))
// ===============================   get single post =================
router.get("/:id",authentication,authorization,validation(postSchema.getSingle),asyncHandler(postServices.getSinglePost))
// ===============================   get all posts (active) =================
router.get("/all/active",authentication,authorization(endpoinedPosts.getAllActive),asyncHandler(postServices.getAllActive))
// ===============================   get all posts Freeze (not active) =================
router.get("/all/notActive",authentication,authorization(endpoinedPosts.getAllActive),asyncHandler(postServices.getAllNotActive))
// =============================== like post =================
router.patch("/like/:id",authentication,authorization(endpoinedPosts.likePost),validation(postSchema.likeSchema),asyncHandler(postServices.likePost))

// ========================================= default export router All Endpoined =================
export default router
