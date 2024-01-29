import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateVoterBody = {
  name: string;
  districtName: string;
  subdistrictName: string;
  familyCardNumber: string;
  individualCardNumber: string;
  birthPlace: string;
  birthDate: string;
  marriageStatus: string;
  gender: string;
  address: string;
  neighbourhood: string;
  hamlet: string;
  pollingPlaceNumber: string;
};

export type TUpdateVoterBody = {
  name: string;
};

export type TGetVotersParams = {
  term?: string;
};

class VoterRepository {
  static districtSelect: Prisma.VoterSelect = {
    id: true,
  };

  static async createVoters(data: TCreateVoterBody[]) {
    try {
      const resp = await DatabaseLib.models.voter.createMany({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async createVoter(data: TCreateVoterBody) {
    try {
      const resp = await DatabaseLib.models.voter.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateVoter(id: number, data: TCreateVoterBody) {
    try {
      const resp = await DatabaseLib.models.voter.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteVoterById(id: number) {
    try {
      const resp = await DatabaseLib.models.voter.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getVoters({
    districtName,
    subdistrictName,
    votingPlaceNumber,
  }: {
    districtName: string;
    subdistrictName: string;
    votingPlaceNumber: string;
  }) {
    try {
      const resp = await DatabaseLib.models.voter.findMany({
        where: {
          districtName,
          subdistrictName,
          pollingPlaceNumber: votingPlaceNumber,
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getVoterById(id: number) {
    try {
      const resp = await DatabaseLib.models.voter.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|ARTICLE_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default VoterRepository;
