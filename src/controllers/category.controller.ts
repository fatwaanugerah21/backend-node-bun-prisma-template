import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import CategoryRepository, {
  TCreateCategoryBody,
} from "../repositories/category.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";

class CategoryController {
  static async create(req: Request, resp: Response) {
    const createCategorySchema = Joi.object<TCreateCategoryBody>({
      name: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body;

      const { error } = createCategorySchema.validate(body);
      if (!!error) throw error.message;

      const categories = await CategoryRepository.createCategory(body);
      resp.json(successResponse(categories));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateCategorySchema = Joi.object<TCreateCategoryBody>({
      name: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateCategorySchema.validate(body);
      if (!!error) throw error.message;

      const categories = await CategoryRepository.updateCategory(
        parseInt(id),
        body
      );
      resp.json(successResponse(categories));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const categories = await CategoryRepository.getCategories({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });
      resp.json(successResponse(categories));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const categories = await CategoryRepository.getCategoryById(
        parseInt(id as string)
      );

      resp.json(successResponse(categories));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const categories = await CategoryRepository.deleteCategoryById(
        parseInt(id as string)
      );

      resp.json(successResponse(categories));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default CategoryController;
