import express, { Router } from "express";
import JobController from "../controllers/job.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class JobRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.get("/", AuthMiddleware.mustLogin, JobController.getJobs);
    this.router.get("/:id", AuthMiddleware.mustLogin, JobController.getJob);

    return this.router;
  }
}

export default JobRoute;
