import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateUserReadBody = {
  bookId: number;
  userId: number;
  currentPage: number;
};

export type TGetUserReadsParams = {
  term?: string;
};

class UserReadRepository {
  static userReadSelect: Prisma.UserReadSelect = {
    id: true,
    currentPage: true,
    createdAt: true,
    updatedAt: true,
  };

  static async createUserRead(data: TCreateUserReadBody) {
    try {
      const resp = await DatabaseLib.models.userRead.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateUserRead(id: number, data: TCreateUserReadBody) {
    try {
      const resp = await DatabaseLib.models.userRead.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteUserReadById(id: number) {
    try {
      const resp = await DatabaseLib.models.userRead.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUserReads({
    limit,
    offset,
    term,
  }: TGetUserReadsParams & TFetchAllParams) {
    console.log("term: ", term);

    try {
      const resp = await DatabaseLib.models.userRead.findMany({
        skip: offset,
        take: limit,
        select: this.userReadSelect,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async checkUserReadByBookIdIsExist(bookId: number) {
    try {
      const resp = await DatabaseLib.models.userRead.count({
        where: {
          bookId,
        },
      });

      return !!resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUserReadByBookId(bookId: number) {
    try {
      const resp = await DatabaseLib.models.userRead.findFirst({
        where: {
          bookId,
        },
      });

      console.log("BookID: ", bookId);

      if (!resp) throw `404|USER_READ_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUserReadById(id: number) {
    try {
      const resp = await DatabaseLib.models.userRead.findFirst({
        where: {
          id,
        },
      });

      if (!resp) throw `404|USER_READ_NOT_FOUND`;

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default UserReadRepository;
