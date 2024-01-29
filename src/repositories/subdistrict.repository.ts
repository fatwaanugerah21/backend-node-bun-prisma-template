import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateSubdistrictBody = {
  name: string;
  districtName: string;
};

export type TGetSubdistrictsParams = {
  term?: string;
};

class SubdistrictRepository {
  static districtSelect: Prisma.SubdistrictSelect = {
    id: true,
  };

  static async createSubdistrict(data: TCreateSubdistrictBody) {
    try {
      const isDistrictExist = await DatabaseLib.models.subdistrict.findFirst({
        where: { name: data.name },
      });
      if (!!isDistrictExist) {
        return isDistrictExist;
      }

      const resp = await DatabaseLib.models.subdistrict.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateSubdistrict(id: number, data: TCreateSubdistrictBody) {
    try {
      const resp = await DatabaseLib.models.subdistrict.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteSubdistrictById(id: number) {
    try {
      const resp = await DatabaseLib.models.subdistrict.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getSubdistricts(districtName: string) {
    try {
      const resp = await DatabaseLib.models.subdistrict.findMany({
        orderBy: { districtName: "asc" },
        where: { districtName },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getSubdistrictById(id: number) {
    try {
      const resp = await DatabaseLib.models.subdistrict.findFirst({
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

export default SubdistrictRepository;
