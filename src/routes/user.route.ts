import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class UserRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", UserController.createUser);

    return this.router;
  }
}

export default UserRoute;
