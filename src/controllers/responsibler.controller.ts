import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import ResponsiblerRepository, { TCreateResponsiblerBody } from "../repositories/responsibler.repository";
import DatabaseLib from "../libs/database.lib";

class ResponsiblerController {
  static async create(req: Request, resp: Response) {
    try {
      const body = req.body as { responsibler: TCreateResponsiblerBody };

      const response = await ResponsiblerRepository.createResponsibler(body.responsibler);

      resp.json(successResponse(response));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async createAll(req: Request, resp: Response) {
    try {
      const body = req.body as { responsiblers: TCreateResponsiblerBody[] };

      const response = await ResponsiblerRepository.createResponsiblers(body.responsiblers);

      resp.json(successResponse(response));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { districtName, subdistrictName, votingPlaceNumber }: any = req.query;

      const responsiblers = await ResponsiblerRepository.getResponsiblers({
        districtName,
        subdistrictName,
        votingPlaceNumber,
      });

      resp.json(successResponse(responsiblers));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAllWithResponsiblerVoters(req: Request, resp: Response) {
    try {
      const { districtName, subdistrictName, votingPlaceNumber, isKipOnly, maximumVoters, coordinatorName }: any = req.query;

      const responsiblers = await ResponsiblerRepository.getResponsiblersWithResponsiblerVoters({
        districtName,
        subdistrictName,
        votingPlaceNumber,
        coordinatorName,
        isKipOnly: isKipOnly === "true",
        maximumVoters: parseInt(maximumVoters || "0"),
      });

      resp.json(successResponse(responsiblers));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const districts = await ResponsiblerRepository.getResponsiblerById(parseInt(id as string));

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

      const district = await ResponsiblerRepository.deleteResponsiblerById(parseInt(id as string));

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }

  static async deleteAll(req: Request, resp: Response) {
    try {
      const district = await ResponsiblerRepository.deleteAllResponsiblers();

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }
}

export default ResponsiblerController;
