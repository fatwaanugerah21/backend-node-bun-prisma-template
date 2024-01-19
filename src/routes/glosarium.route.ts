import express, { Router } from "express";
import GlosariumController from "../controllers/glosarium.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class GlosariumRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", AuthMiddleware.mustLogin, GlosariumController.create);
    this.router.get("/", GlosariumController.getAll);
    this.router.get("/:id", GlosariumController.getById);
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      GlosariumController.update
    );
    this.router.delete(
      "/:id",
      AuthMiddleware.mustLogin,
      GlosariumController.delete
    );

    return this.router;
  }
}

export default GlosariumRoute;
