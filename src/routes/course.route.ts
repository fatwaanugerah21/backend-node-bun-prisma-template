import express, { Router } from "express";
import CourseController from "../controllers/course.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import IOLib from "../libs/io.lib";

class CourseRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      IOLib.uploadSingleMiddleware("cover"),
      AuthMiddleware.mustLogin,
      CourseController.create
    );
    this.router.get("/", CourseController.getAll);
    this.router.get("/:id", CourseController.getById);
    this.router.put(
      "/:id",
      IOLib.uploadSingleMiddleware("cover"),
      AuthMiddleware.mustLogin,
      CourseController.update
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      CourseController.delete
    );

    return this.router;
  }
}

export default CourseRoute;
