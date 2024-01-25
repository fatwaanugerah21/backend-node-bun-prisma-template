import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateArticleBody = {
  title: string;
  duration: number;
  material: string;
  curriculumId: number;
};

export type TUpdateArticleBody = {
  title?: string;
  duration?: number;
  material?: string;
};

export type TGetArticlesParams = {
  term?: string;
};

class ArticleRepository {
  static articleSelect: Prisma.ArticleSelect = {
    id: true,
    title: true,
  };

  static async createArticle(data: TCreateArticleBody) {
    try {
      const resp = await DatabaseLib.models.article.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateArticle(id: number, data: TCreateArticleBody) {
    try {
      const resp = await DatabaseLib.models.article.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteArticleById(id: number) {
    try {
      const resp = await DatabaseLib.models.article.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getArticles({
    limit,
    offset,
    term,
  }: TGetArticlesParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.article.findMany({
        skip: offset,
        take: limit,
        select: this.articleSelect,
        where: {},
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getArticleById(id: number) {
    try {
      const resp = await DatabaseLib.models.article.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|ARTICLE_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default ArticleRepository;
