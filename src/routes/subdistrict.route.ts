import express, { Router } from "express";
import SubdistrictController from "../controllers/subdistrict.controller";

class SubdistrictRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", SubdistrictController.createAll);
    this.router.get("/", SubdistrictController.getAll);
    this.router.get("/:id", SubdistrictController.getById);
    this.router.delete("/:id", SubdistrictController.delete);

    return this.router;
  }
}

export default SubdistrictRoute;
