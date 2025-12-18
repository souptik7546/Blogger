import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
} from "../utils/mail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import APiError from "../utils/apiError.js";

const generateRefreshAndAccessToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "user with this id does not exist");
  }
  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, password, email } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(
      404,
      "user already exists with this username or email. try with another email or username",
    );
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(
      400,
      "avatar local path is missing or might have not uploaded the file from the frontend",
    );
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "error while uploading the file on cloudinary");
  }

  const user = await User.create({
    username,
    email,
    fullname,
    password,
    avatar: avatar?.url,
    isEmailVerified: false,
  });

  if (!user) {
    throw new ApiError(
      504,
      "error while registering the user in backend try again",
    );
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user?.username,
      `${req.protocol}://${req.get(
        "host",
      )}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "user creation failed at backend please try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "user regestered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  //get the email/ username and password
  //validate
  //check for existing user
  //check for password
  //make refresh and accesstoken
  //set cookie and send response

  const { username, password, email } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(
      400,
      "user does not exist with this email or username you have entered",
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Enetred wrong password. Try again!");
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    user._id,
  );

  const updatedUser = await User.findById(user._id).select("-password -emailVerificationExpiry -emailVerificationToken -forgotPasswordExpiry -forgotPasswordToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "user login successfull", {
        user: updatedUser,
        accessToken,
        refreshToken,
      }),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user?._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user logged out successfully", {}));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new ApiError(
      400,
      "no current loggedin user or maybe the cookies has been removed",
    );
  }

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(400, "invalid refresh token");
  }
  const newAccessToken = user.generateAccessToken();

  console.log(newAccessToken);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .json(
      new ApiResponse(200, "new session generated", {
        accessToken: newAccessToken,
      }),
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  //get the unhashed token from the params
  //check if the email is already verified or not
  //get the user id from req.user and validate the user
  //verify the unhashed token with the hashed token in the db
  //make the isEmail verified filed as true
  //save the user and send a response

  const { verificationCode } = req.params;

  // const user =await User.findById(req.user?._id)
  if (!req.user) {
    throw new ApiError(
      400,
      "the user is no logged in. Login to complete email verification",
    );
  }

  if (req.user.isEmailVerified) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, `${req.user?.username} is already verified`, {}),
      );
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationCode)
    .digest("hex");

  const verifiedUser = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!verifiedUser) {
    throw new APiError(
      402,
      "the email verification time has expired please generate a new session",
    );
  }

  verifiedUser.isEmailVerified = true;
  (verifiedUser.emailVerificationToken = ""),
    (verifiedUser.emailVerificationExpiry = "");

  await verifiedUser.save({ validateBeforeSave: false });

  res.status(209).json(new ApiResponse(200, "email verified successfully", {}));
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  //get the user request
  //check if the user email is already verified and if verified send response
  //create new email verification session and update it on db
  //send a new email with new verification url
  //send response
  if (req.user?.isEmailVerified) {
    throw new ApiError(400, "the user is already email verified");
  }
  const user = await User.findById(req.user?._id);
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        "host",
      )}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });
  const updatedUser = await User.findById(user._id).select(
    "-refreshToken -password -emailVerificationToken -emailVerificationExpiry",
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        209,
        "email verification session regenerated and will be valid till next 20 minutes",
      ),
    );
});

const changePassword = asyncHandler(async (req, res) => {
  //get the oldpassword and new password from the req.body
  //valdate the user with the old password
  //update the passsword
  //send the response

  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const validatePassword = await user.isPasswordCorrect(oldPassword);

  if (!validatePassword) {
    throw new ApiError(
      400,
      "you have entered wrong old password, enter the correct password",
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "password was changed successfully", {}));
});

const forgotPsswordRequest = asyncHandler(async (req, res) => {
  //get the crrent user from req.body
  //send mail
  //send res

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "no user exists with the given email");
  }
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "we got a reset password request",
      mailgenContent: forgotPasswordMailgenContent(
        user.username,
        `${req.protocol}://${req.get(
          "host",
        )}/api/v1/users/reset-password/${unHashedToken}`,
      ),
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "forgot password request sent successfully", {}),
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { forgotPasswordToken } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(forgotPasswordToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "reset password link has expired");
  }

  user.password = newPassword;

  user.forgotPasswordToken = "";
  user.forgotPasswordExpiry = "";

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "new password was saved successfully"));
});

const getCurrentUser= asyncHandler(async(req,res)=>{
  const user= await User.findById(req.user?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")

  if(!user){
    throw new ApiError(400,"no user is logged in currently or maybe there is a problem while fetching the user")
  }

  return res.status(200).json(new ApiResponse(200,"current login user fetched Successfully",user))

})
//todo:-get user (aggrigation pipelines)

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(404, "there is no username in the search params");
  }

  const userProfile = await User.aggregate([
    {
      $match: {
        username: username, //here we have found an user with the username we have got from params
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "createdBy",
        as: "posts",
      },
    },
    {
      $addFields:{
        postCount:{
          $size:"$posts"
        }
      }
    },
    {
      $project: {
        username:1,
        fullname:1,
        email:1,
        avatar:1,
        posts:1,
        postCount:1,
        createdAt:1,
        updatedAt:1
      },
    },
  ]);

  if(!userProfile){
    throw new ApiError(500,"error while fetching the user from the database")
  }

  return res.status(200).json(new ApiResponse(200,"user fetched successfully",userProfile[0]))
});

const userProfileUpdate= asyncHandler(async(req,res)=>{
  //accept all the fields which user want to update
  //get the user
  //validate the password
  //update the fields except the password 
  //return response with the new updated user
  const {newfullname,newusername,password}= req.body;
  const user= await User.findById(req.user._id)

  if(!user){
    throw new ApiError(401,"user session has expired please login again to continue")
  }

  const validatedPassword= await user.isPasswordCorrect(password)
  if(!validatedPassword){
    throw new ApiError(403,"you have entered wrong password, enter correct password and try again")
  }

  if(newfullname){
    user.fullname= newfullname
  }
  if(newusername){
    user.username=newusername
  }
  const avatarLocalPath = req.file?.path;
  if(avatarLocalPath){
    const newavatar=await uploadOnCloudinary(avatarLocalPath)
    if(!newavatar){
      throw new ApiError(500,"error while uploading file on cloudinary")
    }
    user.avatar=newavatar?.url
  }

  await user.save()

  const updatedUser=await User.findById(user?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

  return res
  .status(200)
  .json(new ApiResponse(200,"user details updated successfully",updatedUser))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyEmail,
  resendEmailVerification,
  changePassword,
  forgotPsswordRequest,
  resetPassword,
  getUserProfile,
  getCurrentUser,
  userProfileUpdate
};
