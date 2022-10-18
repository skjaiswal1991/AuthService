//import { EmailService } from './../../../../DirectoryService/bussinessLogic/email.bussiness';
import { Request, Response, Router } from "express";
import error_handler from "../../../server/middlewares/error.handler.class";
import * as jwt from "jsonwebtoken";
import {validationResult} from "express-validator";
import { EmailService } from '../../../bussinessLogic/email.bussiness'
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
        const Emailser = new EmailService() 
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
                let emailTo =  req.body.email;
                let subject = "Welcome In Rateusonline";
                let content = `<div>Dear ${req.body.fullName}, 
                <p>We are delighted to have you on board with us. We are glad to see that you’ve registered on our website with your business information and entrusted us with this service to reach as many potential customers as possible all over UK.</p>
                <p>Request you to kindly verify your listing and confirm that it has all the information you wish to share. Once you confirm the details, we will upload the same for all your customers to see. The verification process will help us ensure that we only share information and details approved by you and which will help your business thrive.</p>
                <p>Please feel free to contact us for any further query/feedback. Have a great day 😊 </p> 
                Regards,<br>
                RateUsOnline Team  
                            </div>`
                let response = Emailser.sendEmail(emailTo,content,subject,false)
                res.status(201).send({userresponse:resp,Email:response});
                
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