import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";

const generateRefreshAndAccessToken = async (userId) => {
    console.log(userId);
    
  const user = await User.findById(userId);
  if(!user){
    throw new ApiError(404,"user with this id does not exist")
  }
  const refreshToken =await user.generateRefreshToken();
  const accessToken =await user.generateAccessToken();

  console.log(refreshToken,accessToken);
  

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

  console.log(avatarLocalPath)

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

  const user =await User.create({
    username,
    email,
    fullname,
    password,
    avatar: avatar?.url,
    isEmailVerified: false,
  });
  console.log(user);
  

  if (!user) {
    throw new ApiError(
      504,
      "error while registering the user in backend try again",
    );
  }

  const { accessToken, refreshToken } =await generateRefreshAndAccessToken(
    user?._id
  );

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
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
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


export {registerUser}
