import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import VoterRepository, {
  TCreateVoterBody,
} from "../repositories/voter.repository";

class VoterController {
  static async createAll(req: Request, resp: Response) {
    try {
      const body = req.body as { voters: TCreateVoterBody[] };

      const response = await VoterRepository.createVoters(body.voters);

      resp.json(successResponse(response));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { districtName, subdistrictName, votingPlaceNumber }: any =
        req.query;
      const districts = await VoterRepository.getVoters({
        districtName,
        subdistrictName,
        votingPlaceNumber,
      });

      resp.json(successResponse(districts));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const districts = await VoterRepository.getVoterById(
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

      const district = await VoterRepository.getVoterById(
        parseInt(id as string)
      );

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }
}

export default VoterController;
