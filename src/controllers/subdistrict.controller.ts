import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import SubdistrictRepository from "../repositories/subdistrict.repository";

class SubdistrictController {
  static async createAll(req: Request, resp: Response) {
    try {
      const body = req.body as { [name in string]: { name: string }[] };

      await Promise.all(
        Object.keys(body).map(async (districtName) => {
          try {
            const subdistricts = body[districtName];
            await Promise.all(
              subdistricts.map(async (s) => {
                await SubdistrictRepository.createSubdistrict({
                  name: s.name,
                  districtName: districtName,
                });
              })
            );
          } catch (error) {
            console.error(error);
            resp.json(errorResponse(error + ""));
          }
        })
      );

      resp.json(successResponse(`Done bang: ${Object.keys(body).length}`));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { districtName } = req.query;
      const districts = await SubdistrictRepository.getSubdistricts(
        districtName as string
      );
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

      const districts = await SubdistrictRepository.getSubdistrictById(
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

      const district = await SubdistrictRepository.getSubdistrictById(
        parseInt(id as string)
      );

      resp.json(successResponse(district));
    } catch (error) {
      console.error(error);

      resp.json(errorResponse(error + ""));
    }
  }
}

export default SubdistrictController;
