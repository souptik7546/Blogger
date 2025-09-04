import { v2 as cloudinary } from "cloudinary";
import ApiError from "./apiError.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new ApiError(401, "local file path was not provided");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    throw new ApiError(400, "error wile uplodaing file on cloudinary");
    fs.unlinkSync(localFilePath);
  }
};

export default uploadOnCloudinary;
