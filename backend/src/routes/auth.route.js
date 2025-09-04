import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { userRegisterValidator } from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.single("avatar"),
    userRegisterValidator(),
    validate,
    registerUser,
  );

export default router;
