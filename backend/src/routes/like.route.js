import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { likePost, removeLike } from "../controllers/like.controller.js"

const router= Router()

router.route("/create/:post").post(verifyJWT,likePost)
/*
post on http://localhost:5173/api/v1/like/create/:post
*/
router.route("/delete/:post").post(verifyJWT,removeLike)
/*
post on http://localhost:5173/api/v1/like/delete/:post
*/

export default router