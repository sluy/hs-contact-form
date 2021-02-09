import { Request, Response } from "express";
import { MainController } from "../controller/main";
export class Routes {
  private controller: MainController;
  constructor() {
    this.controller = new MainController();
  }
  public routes(app): void {
    app.route("/").get((request: Request, response: Response) => {
      // Main page
      response.status(200).send({
        message: "SERVER UP.",
      });
    });
    // handle http://localhost:3000/categories request.
    app
      .route("/categories")
      .get((req, res) => this.controller.getAllCategories(req, res));
    // handle http://localhost:3000/messages request.
    app
      .route("/messages")
      .post(async (req, res) => await this.controller.storeMessage(req, res));
  }
}
