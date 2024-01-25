import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import QuizRepository, {
  TCreateQuizBody,
  TUpdateQuizBody,
} from "../repositories/quiz.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";
import CurriculumRepository from "../repositories/curriculum.repository";

class QuizController {
  static async create(req: Request, resp: Response) {
    const createQuizSchema = Joi.object<
      Omit<TCreateQuizBody, "sequenceNumber">
    >({
      title: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "TITLE_MUST_BE_STRING",
      }),
      curriculumId: Joi.number().required().messages({
        "any.required": "NO_CURRICULUM_ID_ERROR",
        "number.base": "CURRICULUM_ID_MUST_BE_NUMBER",
      }),
      duration: Joi.number().messages({
        "any.required": "NO_DURATION_PARAMS_ERROR",
        "number.base": "DURATION_MUST_BE_NUMBER",
      }),
      description: Joi.string().messages({
        "any.required": "NO_DESCRIPTION_ERROR",
        "string.base": "DESCRIPTION_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body as TCreateQuizBody;

      const { error } = createQuizSchema.validate(body);
      if (!!error) throw error.message;

      const curriculumSequences =
        await CurriculumRepository.getAllCurriculumSequences(body.curriculumId);
      console.log("curriculumSequences: ", curriculumSequences);

      let highestSeq = 0;
      curriculumSequences?.forEach((cs) => (highestSeq = cs.sequenceNumber));
      console.log("highestSeq: ", highestSeq);

      const quiz = await QuizRepository.createQuiz(body);
      console.log("quiz: ", quiz);

      const curriculumSeq = await CurriculumRepository.createCurriculumSequence(
        {
          type: "QUIZ",
          quizId: quiz.id,
          curriculumId: body.curriculumId,
          sequenceNumber: highestSeq + 1,
        }
      );
      console.log("curriculumSeq: ", curriculumSeq);

      resp.json(successResponse(quiz));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateQuizSchema = Joi.object<TUpdateQuizBody>({
      title: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
      duration: Joi.number().messages({
        "any.required": "NO_DURATION_PARAMS_ERROR",
      }),
      description: Joi.string().messages({
        "any.required": "NO_DESCRIPTION_ERROR",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateQuizSchema.validate(body);
      if (!!error) throw error.message;

      const curriculums = await QuizRepository.updateQuiz(parseInt(id), body);
      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const curriculums = await QuizRepository.getQuizs({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });
      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const curriculums = await QuizRepository.getQuizById(
        parseInt(id as string)
      );

      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    let deletedQuiz: any | null = null;
    let deletedCurriculumSequence: any | null = null;
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const curriculumQuiz = await QuizRepository.getQuizById(
        parseInt(id as string)
      );

      const curriculumSequence =
        await CurriculumRepository.deleteCurriculumSequenceOfQuiz(
          curriculumQuiz.curriculumId,
          curriculumQuiz.id
        );

      const deletedQuiz = await QuizRepository.deleteQuizById(
        curriculumQuiz.id
      );

      // Decreasing all other curriculumSequences number
      const res =
        await CurriculumRepository.decreaseAllCurriculumSequencesNumberAfterThisSeq(
          curriculumQuiz.curriculumId,
          curriculumSequence?.sequenceNumber!
        );

      resp.json(successResponse(deletedQuiz));
    } catch (error) {
      console.error(error);
      if (!!deletedQuiz) {
        const newQuiz = await QuizRepository.createQuiz(deletedQuiz);

        deletedCurriculumSequence.quizId = newQuiz.id;
        if (!!deletedCurriculumSequence) {
          await CurriculumRepository.createCurriculumSequence(
            deletedCurriculumSequence
          );
        }
      }

      resp.json(errorResponse(error + ""));
    }
  }
}

export default QuizController;
