import { Request, Response, NextFunction, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

interface UserObject {
  user: Object;
  role: String;
  iat: Number;
  exp: Number;
}

const AuthMiddleware = {
  base: (req: Request, res: Response, next: NextFunction) => {
    if (Boolean(req.headers.authorization)) {
      const token = req.headers.authorization;
      const tokenArray = token.split(" ");
      const accsessToken = tokenArray[1];
      jwt.verify(accsessToken, process.env.CLINT_SECRATE_KEY_1, function(
        err,
        decodedToken
      ) {
        if (err) {
          console.log(err);
          res.status(403).send({ message: "Not validated" });
          res.end();
        } else {
          console.log(decodedToken);
          const userObj = decodedToken;
          const lastBody = req.body;
          req.body = Object.assign(lastBody, {
            user: userObj,
          });
          next();
        }
      });
    } else {
      res.status(401).send({ message: "Unauthorised" });
      res.end();
    }
  },
  admin: (req: Request, res: Response, next: NextFunction) => {
    console.log("here in admin sections");
    if (Boolean(req.headers.authorization)) {
      const token = req.headers.authorization;
      const tokenArray = token.split(" ");
      const accsessToken = tokenArray[1];
      jwt.verify(accsessToken, process.env.CLINT_SECRATE_KEY_1, function(
        err,
        decodedToken: Object
      ) {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Not validated admin" });
          res.end();
        } else {
          const userObj = decodedToken;
          const lastBody = req.body;
          console.log(decodedToken);
          if (userObj["role"] == "CABT_ADMIN") {
            req.body = Object.assign(lastBody, {
              user: userObj,
            });
            next();
          } else {
            res.status(500).send({
              message:
                "Sorry !! Permission Denalid Please contect to ADMIN .... ",
            });
            res.end();
          }
        }
      });
    } else {
      res.status(401).send({ message: "Unauthorised" });
      res.end();
    }
  },
};
export default AuthMiddleware;
