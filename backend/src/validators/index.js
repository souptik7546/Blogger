import { body } from "express-validator";

const userRegisterValidator=()=>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("inavalid email entered"),
        body("username")
        .trim()
        .notEmpty()
        .withMessage("username is required")
        .isLength({min:3})
        .withMessage("username must be atleast 3 characters long"),
        body("password")
        .trim()
        .notEmpty()
        .withMessage("password is required")
        .isLength({min:8})
        .withMessage("password should be atleast 8 characters long")
    ]
}


export {userRegisterValidator}