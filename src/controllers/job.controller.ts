import { Request, Response } from "express";
import JobService from "../services/job.service";
import { errorResponse, successResponse } from "../utils/responses.util";

class JobController {
  static async getJobs(req: Request, res: Response) {
    try {
      const { offset, limit, ...params } = req.query;
      if (!offset || !limit) {
        throw new Error("Please specify offset and limit");
      }

      const data = await JobService.getJobs(
        {
          offset: parseInt(offset as string),
          limit: parseInt(limit as string),
        },
        params
      );

      res.json(successResponse(data));
    } catch (error) {
      console.error(error);
      res.json(errorResponse(400, "Please read backend log"));
    }
  }

  static async getJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await JobService.getJob(id);

      res.json(successResponse(data));
    } catch (error) {
      console.error(error);
      res.json(errorResponse(400, "Please read backend log"));
    }
  }
}

export default JobController;
