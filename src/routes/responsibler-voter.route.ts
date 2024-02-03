import express, { Router } from "express";
import ResponsiblerVoterController from "../controllers/responsibler-voter.controller";

class ResponsiblerVoterRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post("/", ResponsiblerVoterController.create);
    this.router.get(
      "/all-duplicate",
      ResponsiblerVoterController.getAllDuplicate
    );
    this.router.get(
      "/inputted-district-and-subdistrict",
      ResponsiblerVoterController.getInputtedDistrictAndSubdistricts
    );
    this.router.get("/", ResponsiblerVoterController.getAll);
    this.router.get("/", ResponsiblerVoterController.getAll);
    this.router.get("/:id", ResponsiblerVoterController.getById);
    this.router.delete("/:id", ResponsiblerVoterController.delete);

    return this.router;
  }
}

export default ResponsiblerVoterRoute;
