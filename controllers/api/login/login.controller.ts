import { Request, Response, Router } from "express";
import error_handler from "../../../server/middlewares/error.handler.class";
import * as jwt from "jsonwebtoken";
import {validationResult} from "express-validator";
import login_validator from "../../../server/middlewares/validators/login.validator"
import {AuthBussiness} from "../../../bussinessLogic/auth.business";
import {EmailService} from '../../../bussinessLogic/email.bussiness'
import {UserBussiness} from "../../../bussinessLogic/user.bussiness";
import * as md5 from 'md5'

class loginController {
    constructor(router:Router){
        router.post('/',login_validator,this.loginMethod);
        router.post('/forgotpassword/',this.forgotpassword);
        router.post('/genpassword/',this.genpassword);
        router.post('/varifygencode/',this.varifygencode);
    }
    /* Forgot Password */
    varifygencode = async (req:Request,res:Response,next) =>{
        const LoginLogic =  new AuthBussiness() 
        const userBussiness = new UserBussiness();
        let getData = req.body;
        let isExist = await LoginLogic.validateVarifycode(getData)
        console.log("IsExidting data",isExist);
        if(isExist){
                res.status(200).send({resp:true})
            }else{
                res.status(200).send({resp:false}) 
            }
    }
    /* Forgot Password */
    genpassword = async (req:Request,res:Response,next) =>{
        const LoginLogic =  new AuthBussiness() 
        const userBussiness = new UserBussiness();
        let getData = req.body;
        console.log("Forgotpass data",getData)
        let isExist = await LoginLogic.validateVarifycode(getData)
        console.log("IsExidting data",isExist);
        if(isExist){
            let userData = JSON.parse(JSON.stringify(isExist))
            let user = userData[0]
            user.varifycode = ""
            user.password = getData.password

            userBussiness.update(user._id,user,(error,data)=>{
                    console.log(data);
            })
             
                res.status(200).send({state:"success",msg:'Password Update successfully'})
            }else{
                res.status(200).send({state:"error",msg:'Email Not Exist'}) 
            }
    }

    forgotpassword = async (req:Request,res:Response,next) =>{
        const LoginLogic =  new AuthBussiness() 
        const userBussiness = new UserBussiness();
        let getData = req.body;
        console.log("Forgotpass data",getData)
        let isExist = await LoginLogic.validateEmail(getData)
       
        if(isExist){
            let userData = JSON.parse(JSON.stringify(isExist))
            let user = userData[0]
            user.varifycode = md5(user.email)

            userBussiness.update(user._id,user,(error,data)=>{
                    console.log(data);
            })
            const emailLogin = new EmailService()
            const email = user.email
            const content = `<div>
            <h1>Rateusonline</h1>
             <p>clink the link to generate new  Password
             <a href="http://localhost:3020/generatepassword/${user.varifycode}" title="change password" >Click here</a>
             </p>
            
            </div>
            `
            const Subject = "RateUsOnline: Forgot Password"    
            const resp =  emailLogin.sendEmail(email,content,Subject) 
                    res.status(200).send({state:"success",msg:'Email send Please check'})
                }else{
                    res.status(200).send({state:"error",msg:'Email Not Exist'}) 
                }
    }

    loginMethod = async (req:Request,res:Response,next) =>{
        const errors = validationResult(req);
        console.log(errors) 
        if (!errors.isEmpty())
            return next(new error_handler(422,'something whent wrong!!',errors));
        try{
                const LoginLogic =  new AuthBussiness() 
                const resp = await LoginLogic.handleLogin(req.body)
                // console.log('Object Entity');
                // console.log(Object.entries(resp))
                //console.log(Object.values(resp))
                const Person = Object.values(resp);
                if(Person.length === 1){
                   const tokens = await LoginLogic.createTokens(Person); 
                   res.status(200).send({state:"success",msg:'logged in success fully',tokens,Person})
                }else{
                    res.status(503).send({state:"erorr",msg:'Login and password are wrong!'});
                }      
                
        }catch(err){
               
        }    
    }
}

module.exports = loginController;