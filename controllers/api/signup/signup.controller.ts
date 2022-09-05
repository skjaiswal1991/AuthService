import { Request, Response, Router } from "express";
import error_handler from "../../../server/middlewares/error.handler.class";
import * as jwt from "jsonwebtoken";
import {validationResult} from "express-validator";
import signup_validator from "../../../server/middlewares/validators/signup.validator";
import {AuthBussiness} from "../../../bussinessLogic/auth.business";

class signUpController {
    constructor(router:Router){
            router.post('/',signup_validator,this.signUpMethod);
            router.patch('/', signup_validator, this.editUserData);
            //router.patch('/', signup_validator, this.signUpMethod);
            router.get('/', signup_validator, this.signUpMethod);
    }

    signUpMethod = async (req:Request,res:Response,next) =>{
        console.log("I am here Sign")
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            //return next(new error_handler(400,errors,errors));
            return res.status(400).send(errors);
        }
        try{
            const SignUpLogic =  new AuthBussiness() 
            if(req.body.email && req.body.password && req.body.username){
                const resp = await SignUpLogic.handleSingup(req.body)
                console.log("user Create Response",resp);
                res.status(201).send(resp);
            }else{
                return res.status(400).send({status:"error",msg:"please check the Required filed"});
            }
        }catch(err){
            console.log('here in error parts...................')
            next(new error_handler(400,'duplicate emails founded',err));
        }

    }

    editUserData = async (req: Request, res: Response, next) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()){
        //     return next(new error_handler(400,errors,errors));
        // }
        console.log('Edit UserData Section...................')
        console.log(req.body.email);
        try {
            const SignUpLogic = new AuthBussiness()
            const resp = await SignUpLogic.editUser(req.body.email)
            res.status(201).send(resp);
        } catch (err) {
            console.log('here in error parts...................')
            next(new error_handler(400, 'duplicate emails founded', err));
        }

    }

    //editUserData = async () 


}

module.exports = signUpController;