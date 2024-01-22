import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateGlosariumBody = {
  title: string;
  description: string;
};

export type TGetGlossariumsParams = {
  term?: string;
};

class GlosariumRepository {
  static glosariumSelect: Prisma.GlosariumSelect = {
    id: true,
    title: true,
    description: true,
  };

  static async createGlosarium(data: TCreateGlosariumBody) {
    try {
      const resp = await DatabaseLib.models.glosarium.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateGlosarium(id: number, data: TCreateGlosariumBody) {
    try {
      const resp = await DatabaseLib.models.glosarium.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteGlosariumById(id: number) {
    try {
      const resp = await DatabaseLib.models.glosarium.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getGlosariums({
    limit,
    offset,
    term,
  }: TGetGlossariumsParams & TFetchAllParams) {
    console.log("term: ", term);

    try {
      const resp = await DatabaseLib.models.glosarium.findMany({
        skip: offset,
        take: limit,
        select: this.glosariumSelect,
        where: {
          title: { contains: term?.toLowerCase() },
          description: { contains: term?.toLowerCase() },
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getGlosariumById(id: number) {
    try {
      const resp = await DatabaseLib.models.glosarium.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|GLOSARIUM_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default GlosariumRepository;
