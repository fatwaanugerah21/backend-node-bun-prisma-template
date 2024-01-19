import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";
import WriterRepository from "./writer.repository";
import PublisherRepository from "./publisher.repository";

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

class BookRepository {
  static bookSelect: Prisma.BookSelect = {
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

  static async getBooks({
    limit,
    offset,
    term,
  }: TGetBooksParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.book.findMany({
        skip: offset,
        take: limit,
        select: this.bookSelect,
        where: {
          title: { contains: term?.toLowerCase() },
          synopsis: { contains: term?.toLowerCase() },
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getBookById(id: number) {
    try {
      const resp = await DatabaseLib.models.book.findFirst({
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

export default BookRepository;
