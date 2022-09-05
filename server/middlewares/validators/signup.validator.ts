import {body} from "express-validator";
import user_model from "../../../dataAccess/Schemas/user.schema";
const signup_validator = [
    body("fullName")
    .notEmpty().withMessage("must have some value")
    .isString().withMessage("must be a string")
  ,
    body("email").notEmpty().withMessage("Email should not be empty ...")
    .isString().withMessage("Email must be a string...")
    .isEmail().withMessage("Email must be in valid formate...")
    .custom(async(value,{req})=>{
      const userCount = await user_model.findOne({email:value}) 
    }).withMessage("User is already registerd..."),
    body("password").notEmpty().withMessage("Password should not be empty ...")
    .isString().withMessage("Password must be a string...")
]
export default signup_validator;      