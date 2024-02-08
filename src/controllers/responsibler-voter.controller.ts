import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import ResponsiblerVoterRepository from "../repositories/responsibler-voter.repository";
import SubdistrictRepository from "../repositories/subdistrict.repository";

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

  static async getTotalResponsiblerVotersPerSubdistrictCount(
    req: Request,
    resp: Response
  ) {
    try {
      const { subdistrictName } = req.params;
      const responsiblerVotersListOfSubdistrict =
        await ResponsiblerVoterRepository.getResponsiblerVotersPerSubddistrict(
          subdistrictName
        );

      const subdistrictsTotal: { [x in string]: number } = {
        total: responsiblerVotersListOfSubdistrict.length,
      };

      responsiblerVotersListOfSubdistrict.forEach((rv) => {
        if (!subdistrictsTotal[rv.voter.pollingPlaceNumber])
          subdistrictsTotal[rv.voter.pollingPlaceNumber] = 1;
        else
          subdistrictsTotal[rv.voter.pollingPlaceNumber] =
            subdistrictsTotal[rv.voter.pollingPlaceNumber] + 1;
      });

      resp.json(successResponse(subdistrictsTotal));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getTotalResponsiblerVotersCount(req: Request, resp: Response) {
    try {
      const subdistricts = await SubdistrictRepository.getSubdistricts();
      const totalResponsiblerVoters =
        await ResponsiblerVoterRepository.getTotalResponsiblerVoters();

      const subdistrictsTotal: { [x in string]: number } = {
        total: totalResponsiblerVoters,
      };

      await Promise.all(
        subdistricts.map(async (subdistrict) => {
          const subdistrictTotal =
            await ResponsiblerVoterRepository.getTotalResponsiblerVotersCountPerSubddistrict(
              subdistrict.name
            );

          subdistrictsTotal[subdistrict.name] = subdistrictTotal;
        })
      );

      resp.json(successResponse(subdistrictsTotal));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getInputtedDistrictAndSubdistricts(
    req: Request,
    resp: Response
  ) {
    try {
      const districtAndSubdistrictWithCount =
        await ResponsiblerVoterRepository.getInputtedDistrictAndSubdistricts();

      resp.json(successResponse(districtAndSubdistrictWithCount));
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
