import express, { Router } from "express";
import GlosariumController from "../controllers/glosarium.controller";

class GlosariumRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", GlosariumController.create);
    this.router.get("/", GlosariumController.getAll);
    this.router.get("/:id", GlosariumController.getById);
    this.router.put("/:id", GlosariumController.update);
    this.router.delete("/:id", GlosariumController.delete);

    return this.router;
  }
}

export default GlosariumRoute;
