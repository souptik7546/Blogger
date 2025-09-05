import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.single("avatar"),
    userRegisterValidator(),
    validate,
    registerUser,
  );

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/logout").post(verifyJWT,logoutUser)

export default router;
