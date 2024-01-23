import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateCurriculumBody = {
  title: string;
  courseId: number;
};

export type TUpdateCurriculumBody = {
  title?: string;
  courseId?: number;
};

export type TGetCurriculumsParams = {
  term?: string;
};

class CurriculumRepository {
  static curriculumSelect: Prisma.CurriculumSelect = {
    id: true,
    title: true,
  };

  static async createCurriculum(data: TCreateCurriculumBody) {
    try {
      const resp = await DatabaseLib.models.curriculum.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateCurriculum(id: number, data: TCreateCurriculumBody) {
    try {
      const resp = await DatabaseLib.models.curriculum.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteCurriculumById(id: number) {
    try {
      const resp = await DatabaseLib.models.curriculum.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCurriculums({
    limit,
    offset,
    term,
  }: TGetCurriculumsParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.curriculum.findMany({
        skip: offset,
        take: limit,
        select: this.curriculumSelect,
        where: {},
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCurriculumById(id: number) {
    try {
      const resp = await DatabaseLib.models.curriculum.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|CURRICULUM_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default CurriculumRepository;
