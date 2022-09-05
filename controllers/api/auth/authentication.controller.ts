import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import { Error, ConnectionStates } from "mongoose";
import { AuthBussiness } from "../../../bussinessLogic/auth.business";
import AuthMiddlewares from "../../../server/middlewares/authMiddlewares/auth.base.middlware";
import { inflateRaw } from "zlib";
import { Interface } from "readline";
import { resolveSoa } from "dns";
const request_obj = require("request-promise");
interface decodedToken{
  userId:string,
  name:string,
  iat:number,
  exp:number
}

interface ITokenData {
  
}
class Authentication {
  private _router: Router;
  static tokenData :any;
  static plane_cat_array:any;
  static plane_name_array:any;
  constructor(router: Router) {
    this._router = router;
    this._router.all("/", this.checkAuthUser);
    
  }

  public checkAuthUser = async (req: Request, res: Response, next) => {
    console.log(req.headers);
    if (Boolean(req.headers.token)) {
                  
    } else {
       
    }
  };

  static makeid(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

}
module.exports = Authentication;
