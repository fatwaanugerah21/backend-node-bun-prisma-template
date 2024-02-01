import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthController.setPassword);
    this.router.get("/", AuthController.getPassword);

    return this.router;
  }
}

export default AuthRoute;
