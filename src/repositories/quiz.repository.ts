import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateQuizBody = {
  title: string;
  duration: number;
  description: string;
  curriculumId: number;
};

export type TUpdateQuizBody = {
  title?: string;
  duration?: number;
  description?: string;
};

export type TGetQuizsParams = {
  term?: string;
};

class QuizRepository {
  static quizSelect: Prisma.QuizSelect = {
    id: true,
    title: true,
  };

  static async createQuiz(data: TCreateQuizBody) {
    try {
      const resp = await DatabaseLib.models.quiz.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateQuiz(id: number, data: TCreateQuizBody) {
    try {
      const resp = await DatabaseLib.models.quiz.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteQuizById(id: number) {
    try {
      const resp = await DatabaseLib.models.quiz.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getQuizs({
    limit,
    offset,
    term,
  }: TGetQuizsParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.quiz.findMany({
        skip: offset,
        take: limit,
        select: this.quizSelect,
        where: {},
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getQuizById(id: number) {
    try {
      const resp = await DatabaseLib.models.quiz.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|QUIZ_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default QuizRepository;
