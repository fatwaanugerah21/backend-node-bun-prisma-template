import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";
import WriterRepository from "./writer.repository";
import PublisherRepository from "./publisher.repository";
import UserReadRepository from "./user-read.repository";

export interface TCreateBookBody {
  title: string;
  bookName: string;
  coverImage: string;
  synopsis: string;
  publisherId: number;
  writerId: number;
  pageAmt: number;
  releaseDate: Date;
  categoryId: number;
}

export interface TUpdateBookBody {
  title: string;
  bookName?: string;
  coverImage?: string;
  synopsis: string;
  publisherId: number;
  writerId: number;
  pageAmt: number;
  releaseDate: Date;
  categoryId: number;
}

export type TGetBooksParams = {
  term?: string;
};
export type TGetContinueReadingBooksParams = {
  term?: string;
  userId?: number;
};

class BookRepository {
  static bookGeneralSelect: Prisma.BookSelect = {
    id: true,
    title: true,
    bookName: true,
    coverImage: true,
    pageAmt: true,
    synopsis: true,
    writer: {
      select: WriterRepository.writerSelect,
    },
    publisher: {
      select: PublisherRepository.publisherSelect,
    },
    releaseDate: true,
  };

  static async createBook(data: TCreateBookBody) {
    try {
      const resp = await DatabaseLib.models.book.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateBook(id: number, data: TUpdateBookBody) {
    try {
      const resp = await DatabaseLib.models.book.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteBookById(id: number) {
    try {
      const resp = await DatabaseLib.models.book.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getContinueReadingBooks({
    limit,
    offset,
    term,
    userId,
  }: TGetContinueReadingBooksParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.book.findMany({
        skip: offset,
        take: limit,
        select: {
          ...this.bookGeneralSelect,
          UserRead: {
            select: UserReadRepository.userReadSelect,
          },
        },
        where: {
          title: { contains: term?.toLowerCase() },
          synopsis: { contains: term?.toLowerCase() },
          UserRead: {
            some: {
              userId,
            },
          },
        },
      });

      const books = resp.map(({ UserRead, publisher, writer, ...book }) => {
        const ur = UserRead[0];
        return {
          ...book,
          publisher: publisher.name,
          writer: writer.name,
          currentPage: ur.currentPage,
          lastOpened: ur.updatedAt || ur.createdAt,
        };
      });

      return books;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getBooks({
    limit,
    offset,
    term,
  }: TGetBooksParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.book.findMany({
        skip: offset,
        take: limit,
        select: {
          ...this.bookGeneralSelect,
        },
        where: {
          title: { contains: term?.toLowerCase() },
          synopsis: { contains: term?.toLowerCase() },
        },
      });

      const books = resp.map(({ publisher, writer, ...book }) => {
        return {
          ...book,
          publisher: publisher.name,
          writer: writer.name,
        };
      });

      return books;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async checkBookExist(id: number) {
    try {
      const resp = await DatabaseLib.models.book.count({
        where: {
          id,
        },
      });

      return !!resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getBookById(id: number, userId?: number) {
    try {
      const resp = await DatabaseLib.models.book.findFirst({
        select: {
          ...this.bookGeneralSelect,
          UserRead: { select: UserReadRepository.userReadSelect },
        },
        where: {
          id,
          UserRead: {
            some: {
              userId,
            },
          },
        },
      });

      if (!resp) throw `404|BOOK_NOT_FOUND`;

      const { publisher, UserRead, writer, ...restBook } = resp;
      const ur = UserRead[0];
      const book = {
        ...restBook,
        currentPage: ur.currentPage,
        lastOpened: ur.updatedAt || ur.createdAt,
        publisher: resp.publisher.name,
        writer: resp.writer.name,
      };
      return book;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default BookRepository;
