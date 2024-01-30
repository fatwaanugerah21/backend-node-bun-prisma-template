import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import DistrictRepository from "../repositories/district.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";

class DistrictController {
  static async createAll(req: Request, resp: Response) {
    try {
      const body = req.body as { name: string }[];

      const response = await DistrictRepository.createDistricts(body);

      resp.json(successResponse(response));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const districts = await DistrictRepository.getDistricts({});
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

      const districts = await DistrictRepository.getDistrictById(
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

      const district = await DistrictRepository.getDistrictById(
        parseInt(id as string)
      );

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }
}

export default DistrictController;
