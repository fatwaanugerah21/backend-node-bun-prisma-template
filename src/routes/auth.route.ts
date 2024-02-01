import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoute {
  static router = express.Router();

  static routes(): Router {
    const authController = new AuthController();
    this.router.put("/", authController.setPassword);
    this.router.get("/", authController.getPassword);

    return this.router;
  }
}

export default AuthRoute;
