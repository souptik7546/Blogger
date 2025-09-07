import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";


const router= Router()

router.route("/create").post(verifyJWT,createComment)
router.route("/update/:commentId").post(verifyJWT,updateComment)
router.route("/delete/:commentId").post(verifyJWT,deleteComment)



export default router

