import { CurriculumSequenceType, Prisma } from "@prisma/client";
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

export type TCreateCurriculumSequenceParams = {
  curriculumId: number;
  type: CurriculumSequenceType;
  sequenceNumber: number;
  articleId?: number;
  quizId?: number;
};
class CurriculumRepository {
  static curriculumSelect: Prisma.CurriculumSelect = {
    id: true,
    title: true,
  };

  static curriculumSequenceSelect: Prisma.CurriculumSequenceSelect = {
    id: true,
    sequenceNumber: true,
    type: true,
  };

  static async createCurriculumSequence({
    articleId,
    type,
    curriculumId,
    quizId,
    sequenceNumber,
  }: TCreateCurriculumSequenceParams) {
    try {
      console.log(
        `{
        sequenceNumber,
        type,
        curriculumId,
        articleId,
        quizId,
      }: `,
        {
          sequenceNumber,
          type,
          curriculumId,
          articleId,
          quizId,
        }
      );

      const curriculumSequence =
        await DatabaseLib.models.curriculumSequence.create({
          data: {
            sequenceNumber,
            type,
            curriculumId,
            articleId,
            quizId,
          },
        });

      return curriculumSequence;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAllCurriculumSequences(curriculumId: number) {
    const curriculum = await DatabaseLib.models.curriculum.findFirst({
      where: { id: curriculumId },
      select: {
        curriculumSequences: {
          select: this.curriculumSequenceSelect,
          orderBy: {
            curriculumId: "asc",
          },
        },
      },
    });

    return curriculum?.curriculumSequences;
  }

  static async deleteCurriculumSequenceOfArticle(
    curriculumId: number,
    articleId: number
  ) {
    try {
      const curriculumSequence =
        await DatabaseLib.models.curriculumSequence.findFirst({
          where: {
            curriculumId,
            articleId,
          },
        });

      const value = await DatabaseLib.models.curriculumSequence.delete({
        where: {
          id: curriculumSequence?.id,
        },
      });
      console.log("Value: ", value);

      return curriculumSequence;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteCurriculumSequenceOfQuiz(
    curriculumId: number,
    quizId: number
  ) {
    try {
      const curriculumSequence =
        await DatabaseLib.models.curriculumSequence.findFirst({
          where: {
            curriculumId,
            quizId,
          },
        });

      await DatabaseLib.models.curriculumSequence.delete({
        where: {
          id: curriculumSequence?.id,
        },
      });

      return curriculumSequence;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async decreaseAllCurriculumSequencesNumberAfterThisSeq(
    curriculumId: number,
    sequence: number
  ) {
    try {
      const curriculum = await DatabaseLib.models.curriculum.findFirst({
        where: { id: curriculumId },
        select: {
          curriculumSequences: {
            select: this.curriculumSequenceSelect,
            where: {
              sequenceNumber: {
                gt: sequence,
              },
            },
          },
        },
      });

      curriculum?.curriculumSequences.forEach(async (cs) => {
        const newSeqNumber = cs.sequenceNumber - 1;
        await DatabaseLib.models.curriculumSequence.update({
          where: { id: cs.id },
          data: {
            sequenceNumber: newSeqNumber,
          },
        });
      });

      return curriculum;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

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
