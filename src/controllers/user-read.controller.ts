import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import UserReadRepository, {
  TCreateUserReadBody,
} from "../repositories/user-read.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";
import BookRepository from "../repositories/book.repository";
import UserRepository from "../repositories/user.repository";

class UserReadController {
  static async create(req: Request, resp: Response) {
    const createUserReadSchema = Joi.object<TCreateUserReadBody>({
      bookId: Joi.number().required().messages({
        "any.required": "NO_BOOK_ID_ERROR",
        "number.base": "TITLE_MUST_BE_STRING",
      }),
      userId: Joi.number().required().messages({
        "any.required": "NO_USER_ID_ERROR",
        "number.base": "DESCRIPTION_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body as TCreateUserReadBody;

      const { error } = createUserReadSchema.validate(body);
      if (!!error) throw error.message;

      const isUserReadForThisBookExist =
        await UserReadRepository.checkUserReadByBookIdIsExist(body.bookId);
      if (!!isUserReadForThisBookExist)
        throw "400|THIS_USER_ALREADY_READ_THIS_BOOK";

      // Check is book and user exist
      const isBookExist = await BookRepository.checkBookExist(body.bookId);
      const isUserExist = await UserRepository.checkUserExist(body.userId);
      if (!isUserExist || !isBookExist) throw "404|USER_OR_BOOK_NOT_FOUND";

      const userReads = await UserReadRepository.createUserRead(body);
      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async updateByBookId(req: Request, resp: Response) {
    const updateUserReadSchema = Joi.object<TCreateUserReadBody>({
      currentPage: Joi.number().required().messages({
        "any.required": "NO_CURRENT_PAGE_ERROR",
        "number.base": "TITLE_MUST_BE_STRING",
      }),
    });

    try {
      const { bookId } = req.query;
      if (!bookId) throw `BOOK_ID_NOT_PROVIDED`;

      const userRead = await UserReadRepository.getUserReadByBookId(
        parseInt(bookId as string)
      );

      const body = req.body;

      const { error } = updateUserReadSchema.validate(body);
      if (!!error) throw error.message;

      const userReads = await UserReadRepository.updateUserRead(
        userRead.id,
        body
      );
      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateUserReadSchema = Joi.object<TCreateUserReadBody>({
      currentPage: Joi.number().required().messages({
        "any.required": "NO_CURRENT_PAGE_ERROR",
        "number.base": "TITLE_MUST_BE_STRING",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateUserReadSchema.validate(body);
      if (!!error) throw error.message;

      const userReads = await UserReadRepository.updateUserRead(
        parseInt(id),
        body
      );
      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const userReads = await UserReadRepository.getUserReads({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });
      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const userReads = await UserReadRepository.getUserReadById(
        parseInt(id as string)
      );

      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const userReads = await UserReadRepository.deleteUserReadById(
        parseInt(id as string)
      );

      resp.json(successResponse(userReads));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default UserReadController;
