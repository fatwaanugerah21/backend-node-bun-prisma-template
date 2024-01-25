import express, { Router } from "express";
import QuizController from "../controllers/quiz.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class QuizRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthMiddleware.mustLogin, QuizController.create);
    this.router.get("/", QuizController.getAll);
    this.router.get("/:id", QuizController.getById);
    this.router.put("/:id", AuthMiddleware.mustLogin, QuizController.update);
    this.router.delete("/:id", AuthMiddleware.mustLogin, QuizController.delete);

    return this.router;
  }
}

export default QuizRoute;
