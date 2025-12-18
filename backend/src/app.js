import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";

const app = express();
//basic configuarations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use(cookieParser());

app.get("/",(req,res)=>{
  return res.json("hello world")
})

//import of routers
import userRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
import APiError from "./utils/apiError.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);

//global error handler(handles all the error and sends the response to the frontend in pure json format)
app.use((err, req, res, next) => {
  //when there are all the 4 parameters err, req, res, next express knows it is a error middleware
  if (err instanceof APiError) {
    // checking if it is an instance of our self created ApiError class or not

    return res
    .status(err.statusCode)
    .json({
      //here we are converting the ApiError response in json format so that it is easily redable in frontend
      success: false,
      message: err.message,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // fallback for unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
