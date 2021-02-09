import "reflect-metadata";
import * as express from "express";
import bodyParser = require("body-parser");
import { Routes } from "./routes/all";
export class App {
  public express!: express.Application;
  public routePrv!: Routes;
  constructor() {
    // initializing express in this application
    this.express = express(); // support application/json type post data
    this.express.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
    this.express.use(bodyParser.urlencoded({ extended: false })); // for routing the http request to controller
    this.routePrv = new Routes();
    this.routePrv.routes(this.express);
  }
}
const service = new App();
export default service;
