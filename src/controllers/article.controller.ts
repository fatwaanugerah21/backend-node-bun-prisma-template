import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import ArticleRepository, {
  TCreateArticleBody,
  TUpdateArticleBody,
} from "../repositories/article.repository";
import { getDefaultStartAndOffset as getDefaultOffsetAndLimit } from "../utils/functions.util";
import CurriculumRepository from "../repositories/curriculum.repository";

class ArticleController {
  static async create(req: Request, resp: Response) {
    const createArticleSchema = Joi.object<
      Omit<TCreateArticleBody, "sequenceNumber">
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
      material: Joi.string().messages({
        "any.required": "NO_MATERIAL_ERROR",
        "string.base": "MATERIAL_MUST_BE_STRING",
      }),
    });

    try {
      const body = req.body as TCreateArticleBody;

      const { error } = createArticleSchema.validate(body);
      if (!!error) throw error.message;

      const curriculumSequences =
        await CurriculumRepository.getAllCurriculumSequences(body.curriculumId);
      console.log("curriculumSequences: ", curriculumSequences);

      let highestSeq = 0;
      curriculumSequences?.forEach((cs) => (highestSeq = cs.sequenceNumber));
      console.log("highestSeq: ", highestSeq);

      const article = await ArticleRepository.createArticle(body);
      console.log("article: ", article);

      const curriculumSeq = await CurriculumRepository.createCurriculumSequence(
        {
          type: "ARTICLE",
          articleId: article.id,
          curriculumId: body.curriculumId,
          sequenceNumber: highestSeq + 1,
        }
      );
      console.log("curriculumSeq: ", curriculumSeq);

      resp.json(successResponse(article));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateArticleSchema = Joi.object<TUpdateArticleBody>({
      title: Joi.string().messages({
        "string.base": "NAME_MUST_BE_STRING",
      }),
      duration: Joi.number().messages({
        "any.required": "NO_DURATION_PARAMS_ERROR",
      }),
      material: Joi.string().messages({
        "any.required": "NO_MATERIAL_ERROR",
      }),
    });

    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const body = req.body;

      const { error } = updateArticleSchema.validate(body);
      if (!!error) throw error.message;

      const curriculums = await ArticleRepository.updateArticle(
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

      const curriculums = await ArticleRepository.getArticles({
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

      const curriculums = await ArticleRepository.getArticleById(
        parseInt(id as string)
      );

      resp.json(successResponse(curriculums));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    let deletedArticle: any | null = null;
    let deletedCurriculumSequence: any | null = null;
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const curriculumArticle = await ArticleRepository.getArticleById(
        parseInt(id as string)
      );

      console.log("curriculumArticle: ", curriculumArticle);

      const curriculumSequence =
        await CurriculumRepository.deleteCurriculumSequenceOfArticle(
          curriculumArticle.curriculumId,
          curriculumArticle.id
        );
      console.log("curriculumSequence: ", curriculumSequence);

      const deletedArticle = await ArticleRepository.deleteArticleById(
        curriculumArticle.id
      );
      console.log("deletedArticle: ", deletedArticle);

      // Decreasing all other curriculumSequences number
      const res =
        await CurriculumRepository.decreaseAllCurriculumSequencesNumberAfterThisSeq(
          curriculumArticle.curriculumId,
          curriculumSequence?.sequenceNumber!
        );

      resp.json(successResponse(deletedArticle));
    } catch (error) {
      console.error(error);
      if (!!deletedArticle) {
        const newArticle = await ArticleRepository.createArticle(
          deletedArticle
        );

        deletedCurriculumSequence.articleId = newArticle.id;
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

export default ArticleController;
