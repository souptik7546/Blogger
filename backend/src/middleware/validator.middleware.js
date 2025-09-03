import { validationResult } from "express-validator";
import APiError from "../utils/apiError.js";


export const validate= (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors=[]
    errors.array().map((error)=>{
        extractedErrors.push({[error.path]:error.message})
    })

    throw new APiError(409,"Received Data is not valid",extractedErrors)
}