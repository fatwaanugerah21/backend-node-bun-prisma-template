import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class UserRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthMiddleware.mustLogin, UserController.createUser);
    this.router.get("/", UserController.getUsers);
    this.router.get("/:id", UserController.getUser);
    this.router.put("/:id", AuthMiddleware.mustLogin, UserController.putUser);
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      UserController.deleteUser
    );

    return this.router;
  }
}

export default UserRoute;
