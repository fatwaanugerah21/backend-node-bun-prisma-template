import express, { Router } from "express";
import ResponsiblerController from "../controllers/responsibler.controller";

class ResponsiblerRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", ResponsiblerController.create);
    this.router.post("/all", ResponsiblerController.createAll);
    this.router.get(
      "/with-voters",
      ResponsiblerController.getAllWithResponsiblerVoters
    );
    this.router.get("/", ResponsiblerController.getAll);
    this.router.get("/:id", ResponsiblerController.getById);
    this.router.delete("/all", ResponsiblerController.deleteAll);
    this.router.delete("/:id", ResponsiblerController.delete);

    return this.router;
  }
}

export default ResponsiblerRoute;
