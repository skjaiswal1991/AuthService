import * as fs from "fs";
import * as path from "path";
import { Express, Router } from "express";
const rateLimit = require("express-rate-limit");
export default class RouterClass {
  public startFolder: string | null;
  constructor() {
    this.startFolder = null;
  }

  renderWidget = async function renderWidget(app: Express, path: string) {
    const widget = await import(path);
    app.use(widget);
    console.warn("done");
  };

  load(app: Express, folderName: string) {
    if (!this.startFolder) this.startFolder = path.basename(folderName);
    fs.readdirSync(folderName).forEach((file) => {
      const fullName = path.join(folderName, file);
      const stat = fs.lstatSync(fullName);
      if (stat.isDirectory()) {
        this.load(app, fullName);
      } else if (file.toLowerCase().indexOf(".ts")) {
        let dirs = path.dirname(fullName).split(path.sep);
        if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
          const res1 = dirs.splice(0, 1);
        }
        const router = Router();
        const baseRoute = "/" + dirs.join("/");
        console.warn("Created route: " + baseRoute + " for " + fullName);
        const controllerClass = require(path.join("../", fullName));
        //console.warn("getting controller class " + controllerClass);
        const strictRateLimit = rateLimit({
          windowMs: 15 * 60 * 1000, // 15 min in ms
          max: 1000,
          message:
            "This endpoint has a stricter rate limiting of a maximum of 200 requests per 15 minutes window, please lower your request rate",
        });
        const controller = new controllerClass(router, strictRateLimit);
        //Associate the route with the router
        app.use(baseRoute, router);
      }
    });
  }
}
