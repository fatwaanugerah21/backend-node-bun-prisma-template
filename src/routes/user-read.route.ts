import express, { Router } from "express";
import UserReadController from "../controllers/user-read.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import IOLib from "../libs/io.lib";

class UserReadRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      AuthMiddleware.validateId("body", "userId"),
      UserReadController.create
    );
    this.router.get("/", UserReadController.getAll);
    this.router.get("/:id", UserReadController.getById);
    this.router.put(
      "/",
      AuthMiddleware.mustLogin,
      UserReadController.updateByBookId
    );
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      UserReadController.update
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      UserReadController.delete
    );

    return this.router;
  }
}

export default UserReadRoute;
