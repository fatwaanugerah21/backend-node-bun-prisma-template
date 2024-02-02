import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateResponsiblerBody = {
  isKip: boolean;
  districtName: string;
  subdistrictName: string;
  vottingPlaceNumber: string;
  individualCardNumber: string;
  name: string;
  address: string;
  status: string;
  phoneNumber: string;
  realVoter: number;
  coordinatorName: string;
};

export type TGetResponsiblersParams = {
  term?: string;
};

class ResponsiblerRepository {
  static genSelect: Prisma.ResponsiblerSelect = {
    address: true,
    name: true,
    id: true,
    isKip: true,
    coordinatorName: true,
    districtName: true,
    realVoter: true,
    individualCardNumber: true,
    phoneNumber: true,
    responsiblerVoters: true,
    subdistrictName: true,
    status: true,
    vottingPlaceNumber: true,
  };

  static async createResponsibler(data: TCreateResponsiblerBody) {
    try {
      const resp = await DatabaseLib.models.responsibler.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async createResponsiblers(data: TCreateResponsiblerBody[]) {
    try {
      const resp = await DatabaseLib.models.responsibler.createMany({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateResponsibler(id: number, data: TCreateResponsiblerBody) {
    try {
      const resp = await DatabaseLib.models.responsibler.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteAllResponsiblers() {
    try {
      const resp = await DatabaseLib.models.responsibler.deleteMany({});

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteResponsiblerById(id: number) {
    try {
      const resp = await DatabaseLib.models.responsibler.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getResponsiblers({
    districtName,
    subdistrictName,
    votingPlaceNumber,
  }: {
    districtName: string;
    subdistrictName: string;
    votingPlaceNumber: string;
  }) {
    try {
      const resp = await DatabaseLib.models.responsibler.findMany({
        orderBy: {
          responsiblerVoters: { _count: "desc" },
        },
        where: {
          districtName,
        },
        select: this.genSelect,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getResponsiblerById(id: number) {
    try {
      const resp = await DatabaseLib.models.responsibler.findFirst({
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

export default ResponsiblerRepository;
