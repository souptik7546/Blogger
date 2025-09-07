import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
//basic configuarations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))


app.use(cookieParser())


//import of routers
import userRouter from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/post",postRoute)




export default app
