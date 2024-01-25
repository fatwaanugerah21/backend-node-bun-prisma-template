import express, { Router } from "express";
import ArticleController from "../controllers/article.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class ArticleRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthMiddleware.mustLogin, ArticleController.create);
    this.router.get("/", ArticleController.getAll);
    this.router.get("/:id", ArticleController.getById);
    this.router.put("/:id", AuthMiddleware.mustLogin, ArticleController.update);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      ArticleController.delete
    );

    return this.router;
  }
}

export default ArticleRoute;
