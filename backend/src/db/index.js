import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/"BLOGAPP"`)
        console.log(connectionInstance?.connection.host);
    } catch (error) {
        console.error("mongo db connection failure ")
        process.exit(1)
    }
}

