import express, { Router } from "express";
import VoterController from "../controllers/voter.controller";

class VoterRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", VoterController.createAll);
    this.router.get("/", VoterController.getAll);
    this.router.get("/:id", VoterController.getById);
    this.router.delete("/:id", VoterController.delete);

    return this.router;
  }
}

export default VoterRoute;
