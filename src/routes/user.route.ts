import express, { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.get("/", UserController.getUsers);

    return this.router;
  }
}

export default UserRoute;
