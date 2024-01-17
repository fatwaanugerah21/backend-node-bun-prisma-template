import { Request, Response } from "express";
import BcryptLib from "../libs/bcrypt.lib";
import UserRepository, {
  TCreateUserBody,
} from "../repositories/user.repository";
import { errorResponse, successResponse } from "../utils/responses.util";
import JwtLib from "../libs/jwt.lib";
import Joi from "joi";
import { UserRole } from "@prisma/client";
import GlosariumRepository, {
  TCreateGlosariumBody,
} from "../repositories/glosarium.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";

class AuthController {
  static async create(req: Request, resp: Response) {
    const createGlosariumSchema = Joi.object<TCreateGlosariumBody>({
      title: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "TITLE_MUST_BE_STRING",
      }),
      description: Joi.string().required().messages({
        "any.required": "NO_DESCRIPTION_ERROR",
        "string.base": "DESCRIPTION_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body;

      const { error } = createGlosariumSchema.validate(body);
      if (!!error) throw error.message;

      const glosariums = await GlosariumRepository.createGlosarium(body);
      resp.json(successResponse(glosariums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateGlosariumSchema = Joi.object<TCreateGlosariumBody>({
      title: Joi.string().messages({
        "string.base": "TITLE_MUST_BE_STRING",
      }),
      description: Joi.string().messages({
        "string.base": "DESCRIPTION_MUST_BE_STRING",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateGlosariumSchema.validate(body);
      if (!!error) throw error.message;

      const glosariums = await GlosariumRepository.updateGlosarium(
        parseInt(id),
        body
      );
      resp.json(successResponse(glosariums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const glosariums = await GlosariumRepository.getGlosariums({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });
      resp.json(successResponse(glosariums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const glosariums = await GlosariumRepository.getGlosariumById(
        parseInt(id as string)
      );

      resp.json(successResponse(glosariums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const glosariums = await GlosariumRepository.deleteGlosariumById(
        parseInt(id as string)
      );

      resp.json(successResponse(glosariums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default AuthController;
