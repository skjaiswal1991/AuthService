import * as express from "express";
import { Express } from "express";
import { Server } from "http";
import * as compress from "compression";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as path from "path";
import error_handler from "./middlewares/error.handler.middleware"
import { noCache } from "./middlewares/NoCacheMiddleware";
import BackendRouter from "../routes/router";
const methodOverride = require("method-override");
const rateLimit = require("express-rate-limit");
require("../dataAccess/db/db");

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
  private server?: Express;
  private httpServer?: Server;
  constructor() {}

  public async setup(port: number) {
    const server = express();
  
    this.setupStandardMiddlewares(server);
    this.configureStaticAssets(server);
    //this.setupTelemetry(server)
    // this.setupServiceDependencies(server) 
    this.setupSecurityMiddlewares(server);
    this.configureApiEndpoints(server);
    server.use(methodOverride());
    server.use((req,res,next)=>{
      console.log('logged.....')
      next();
    })
    server.use((err:any, req:any,res:any, next) => {
      if(err){
      console.log("here in error habdeler.........................................................................")
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error';
        res.status(err.statusCode).send({
          status: err.status,
          message: err.message,
          actualError: err.actualError
        });
      }
      
      next();
    });

    this.httpServer = this.listen(server, port);
    this.server = server;
    return this.server;
  }

  public listen(server: Express, port: number) {
    console.log(`Server is listening on Port ${port}`);
    return server.listen(port);
  }

  public kill() {
    if (this.httpServer) this.httpServer.close();
  }

  private setupSecurityMiddlewares(server: Express) {
    server.use(hpp());
    server.use(helmet());
    server.use(cors({ origin: true }));
    server.use(helmet.noCache());
    server.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'unsafe-inline'"],
          scriptSrc: ["'unsafe-inline'", "'self'"],
        },
      })
    );
  }

  private setupStandardMiddlewares(server: Express) {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(compress());
    server.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: "keyboard cat",
        cookie: {
          maxAge: 60000,
          secure: false,
        },
      })
    );
    const baseRateLimitingOptions = {
      windowMs: 15 * 60 * 1000, // 15 min in ms
      max: 10000000,
      message:
        "Our API is rate limited to a maximum of 1000 requests per 15 minutes, please lower your request rate",
    };
    server.use("/api/", rateLimit(baseRateLimitingOptions));
  }
  private configureStaticAssets(server: Express) {
    console.log("Congiguring static assest..");
    server.use("/public", express.static("public"));
  }
  
  private configureApiEndpoints(server: Express) {
    const router = new BackendRouter();
    router.load(server, "controllers");
    
  }
}
