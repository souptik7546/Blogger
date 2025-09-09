import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  changePassword,
  forgotPsswordRequest,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
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

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-accesstoken").post(refreshAccessToken);
router.route("/verify-email/:verificationCode").get(verifyJWT, verifyEmail);
router.route("/resend-email").post(verifyJWT, resendEmailVerification);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/forgot-password").post(forgotPsswordRequest);
router.route("/reset-password/:forgotPasswordToken").post(resetPassword);


//adavance aggrigation routes

router.route("/getuser/:username").post(verifyJWT,getUserProfile)

export default router;
