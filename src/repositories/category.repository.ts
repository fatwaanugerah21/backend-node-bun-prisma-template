import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateCategoryBody = {
  name: string;
};

export type TGetCategoriesParams = {
  term?: string;
};

class CategoryRepository {
  static categorySelect: Prisma.CategorySelect = {
    id: true,
    name: true,
  };

  static async createCategory(data: TCreateCategoryBody) {
    try {
      const resp = await DatabaseLib.models.category.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateCategory(id: number, data: TCreateCategoryBody) {
    try {
      const resp = await DatabaseLib.models.category.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteCategoryById(id: number) {
    try {
      const resp = await DatabaseLib.models.category.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCategories({
    limit,
    offset,
    term,
  }: TGetCategoriesParams & TFetchAllParams) {
    console.log("term: ", term);

    try {
      const resp = await DatabaseLib.models.category.findMany({
        skip: offset,
        take: limit,
        select: this.categorySelect,
        where: {
          name: { contains: term?.toLowerCase() },
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCategoryById(id: number) {
    try {
      const resp = await DatabaseLib.models.category.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|GLOSARIUM_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default CategoryRepository;
