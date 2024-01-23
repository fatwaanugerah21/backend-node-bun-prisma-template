import express, { Router } from "express";
import CurriculumController from "../controllers/curriculum.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class CurriculumRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      CurriculumController.create
    );
    this.router.get("/", CurriculumController.getAll);
    this.router.get("/:id", CurriculumController.getById);
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      CurriculumController.update
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      CurriculumController.delete
    );

    return this.router;
  }
}

export default CurriculumRoute;
