import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

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

export default router;
