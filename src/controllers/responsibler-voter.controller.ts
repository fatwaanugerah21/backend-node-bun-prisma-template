import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import ResponsiblerVoterRepository from "../repositories/responsibler-voter.repository";

class ResponsiblerVoterController {
  static async create(req: Request, resp: Response) {
    try {
      const body = req.body as { responsiblerId: number; voterId: number };

      const response =
        await ResponsiblerVoterRepository.createResponsiblerVoter(body);

      resp.json(successResponse(response));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { responsiblerId } = req.query;
      const districts = await ResponsiblerVoterRepository.getResponsiblerVoters(
        parseInt(responsiblerId as string)
      );
      resp.json(successResponse(districts));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAllDuplicate(req: Request, resp: Response) {
    try {
      const duplicates =
        await ResponsiblerVoterRepository.getResponsiblerVoterDuplicate();

      resp.json(successResponse(duplicates));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const districts =
        await ResponsiblerVoterRepository.getResponsiblerVoterById(
          parseInt(id as string)
        );

      resp.json(successResponse(districts));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const district =
        await ResponsiblerVoterRepository.deleteResponsiblerVoterById(
          parseInt(id as string)
        );

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }
}

export default ResponsiblerVoterController;
