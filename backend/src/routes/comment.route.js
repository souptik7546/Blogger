import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";


const router= Router()

router.route("/create").post(verifyJWT,createComment)
/*
post on http://localhost:5173/api/v1/comment/create
data:- {comment,postId}
*/
router.route("/update/:commentId").post(verifyJWT,updateComment)
/*
post on http://localhost:5173/api/v1/comment/update/:commentId
data:- {newComment}
*/
router.route("/delete/:commentId").post(verifyJWT,deleteComment)
/*
post on http://localhost:5173/api/v1/comment/delete/:commentId
*/


export default router

