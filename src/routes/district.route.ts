import express, { Router } from "express";
import DistrictController from "../controllers/district.controller";

class DistrictRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", DistrictController.createAll);
    this.router.get("/", DistrictController.getAll);
    this.router.get("/:id", DistrictController.getById);
    this.router.delete("/:id", DistrictController.delete);

    return this.router;
  }
}

export default DistrictRoute;
