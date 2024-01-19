import express, { Router } from "express";
import CategoryController from "../controllers/category.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class CategoryRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthMiddleware.mustLogin, CategoryController.create);
    this.router.get("/", CategoryController.getAll);
    this.router.get("/:id", CategoryController.getById);
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      CategoryController.update
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      CategoryController.delete
    );

    return this.router;
  }
}

export default CategoryRoute;
