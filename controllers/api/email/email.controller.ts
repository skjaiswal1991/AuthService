import { Request, Response, Router } from "express";
import {EmailService} from './../../../bussinessLogic/email.bussiness'

const path = require('path')

class EmailSection {
  private _router: Router;
  
  constructor(router: Router) 
  {
    this._router = router;
    //this._router.post("/", Auth.base,this.getYelpUserData);
    this._router.post("/forgotpass", this.forgotemail);
   
    // this._router.post("/autosearch/", this.getYelpSearchData);
  }

  forgotemail = async(req:Request,res:Response)=>
  {
      const emailLogin = new EmailService()
      const email = "akjaiswal9019@gmail.com"
      const content = `<div style="background-color:#036;">
      <h1>Rateusonline</h1>
     <img src="https://www.rateusonline.com/wp-content/uploads/2020/01/logo.png" height="100" width="400" />
     <p>Welcome Email Test</p>
    </div>
    `
      const Subject = "Email Feature"    
      const resp =  emailLogin.sendEmail(email,content,Subject) 
      res.status(200).send(resp);

  }
 
}

module.exports = EmailSection;
