import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller.js";

const router= Router()

router.route("/create").post(verifyJWT,upload.single("featuredImage"),createPost)
router.route("/update/:post").post(verifyJWT,upload.single("featuredImage"),updatePost)
router.route("/getpost/:post").get(verifyJWT,getPost)
router.route("/delete/:post").post(verifyJWT,deletePost)


router.route("/allposts").post(getAllPosts)

export default router