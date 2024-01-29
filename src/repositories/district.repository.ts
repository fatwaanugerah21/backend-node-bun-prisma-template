import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateDistrictBody = {
  name: string;
};

export type TUpdateDistrictBody = {
  name: string;
};

export type TGetDistrictsParams = {
  term?: string;
};

class DistrictRepository {
  static districtSelect: Prisma.DistrictSelect = {
    id: true,
  };

  static async createDistricts(data: TCreateDistrictBody[]) {
    try {
      const resp = await DatabaseLib.models.district.createMany({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateDistrict(id: number, data: TCreateDistrictBody) {
    try {
      const resp = await DatabaseLib.models.district.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteDistrictById(id: number) {
    try {
      const resp = await DatabaseLib.models.district.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getDistricts({}: TGetDistrictsParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.district.findMany();

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getDistrictById(id: number) {
    try {
      const resp = await DatabaseLib.models.district.findFirst({
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

export default DistrictRepository;
