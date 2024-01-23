import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import CourseRepository, {
  TCreateCourseBody,
  TUpdateCourseBody,
} from "../repositories/course.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";

class CourseController {
  static async create(req: Request, resp: Response) {
    const createCourseSchema = Joi.object<TCreateCourseBody>({
      title: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      description: Joi.string().required().messages({
        "any.required": "NO_DESCRIPTION_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body as TCreateCourseBody;
      const file = req.file;

      const { error } = createCourseSchema.validate(body);
      if (!!error) throw error.message;
      if (!file) throw "400|NO_COVER_IMAGE_ERROR";

      body.coverImg = file?.filename!;

      const courses = await CourseRepository.createCourse(body);
      resp.json(successResponse(courses));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateCourseSchema = Joi.object<TCreateCourseBody>({
      title: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
      description: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    try {
      const { id } = req.params;
      const body = req.body as TUpdateCourseBody;
      const file = req.file;

      if (!id) throw "404|COURSE_NOT_FOUND";

      const { error } = updateCourseSchema.validate(body);
      if (!!error) throw error.message;
      if (!!file) {
        body.coverImg = file?.filename!;
      }

      const courses = await CourseRepository.updateCourse(
        parseInt(id + ""),
        body
      );
      resp.json(successResponse(courses));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const courses = await CourseRepository.getCourses({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });
      resp.json(successResponse(courses));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const courses = await CourseRepository.getCourseById(
        parseInt(id as string)
      );

      resp.json(successResponse(courses));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const courses = await CourseRepository.deleteCourseById(
        parseInt(id as string)
      );

      resp.json(successResponse(courses));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default CourseController;
