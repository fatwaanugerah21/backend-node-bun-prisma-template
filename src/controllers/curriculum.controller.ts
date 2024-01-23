import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import CurriculumRepository, {
  TCreateCurriculumBody,
} from "../repositories/curriculum.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";

class CurriculumController {
  static async create(req: Request, resp: Response) {
    const createCurriculumSchema = Joi.object<TCreateCurriculumBody>({
      title: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "TITLE_MUST_BE_STRING",
      }),
      courseId: Joi.number().required().messages({
        "any.required": "NO_COURSE_ID_ERROR",
        "number.base": "COURSE_ID_MUST_BE_NUMBER",
      }),
    });

    try {
      const body = req.body;

      console.log("Body: ", body);

      const { error } = createCurriculumSchema.validate(body);
      if (!!error) throw error.message;

      const curriculums = await CurriculumRepository.createCurriculum(body);
      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateCurriculumSchema = Joi.object<TCreateCurriculumBody>({
      title: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
      courseId: Joi.string().messages({
        "any.required": "NO_COURSE_ID_ERROR",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateCurriculumSchema.validate(body);
      if (!!error) throw error.message;

      const curriculums = await CurriculumRepository.updateCurriculum(
        parseInt(id),
        body
      );
      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const curriculums = await CurriculumRepository.getCurriculums({
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

      const curriculums = await CurriculumRepository.getCurriculumById(
        parseInt(id as string)
      );

      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const curriculums = await CurriculumRepository.deleteCurriculumById(
        parseInt(id as string)
      );

      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default CurriculumController;
