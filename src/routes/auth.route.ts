import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/login", AuthController.login);
    this.router.post("/signup", AuthController.signup);

    return this.router;
  }
}

export default AuthRoute;
