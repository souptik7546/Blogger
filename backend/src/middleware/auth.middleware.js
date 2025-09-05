import { User } from "../models/user.model.js";
import APiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");
  
  
  if (!token) {
    throw new APiError(401, "accessToken is missing login first to continue");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new APiError(404, "acessToken has expired");
  }
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new APiError(400, "failed to fetch user");
  }

  req.user = user;

  next();
});


export {verifyJWT}