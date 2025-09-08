import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { likePost, removeLike } from "../controllers/like.controller.js"

const router= Router()

router.route("/create/:post").post(verifyJWT,likePost)
router.route("/delete/:post").post(verifyJWT,removeLike)

export default router