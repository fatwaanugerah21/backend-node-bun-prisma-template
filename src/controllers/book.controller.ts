import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import Joi from "joi";
import BookRepository, {
  TCreateBookBody,
  TUpdateBookBody,
} from "../repositories/book.repository";
import {
  getDefaultStartAndOffset as getDefaultOffsetAndLimit,
  getUserIdFromRequest,
} from "../utils/functions.util";
import PublisherRepository from "../repositories/publisher.repository";
import WriterRepository from "../repositories/writer.repository";
import { File } from "buffer";
import IOLib from "../libs/io.lib";

interface ICreateUpdateBodyParams {
  title: string;
  publisher: string;
  writer: string;
  pageAmt: string;
  categoryId: string;
  synopsis: string;
  releaseDate: string;
}
class BookController {
  static async create(req: Request, resp: Response) {
    const createBookSchema = Joi.object<ICreateUpdateBodyParams>({
      title: Joi.string().required().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      publisher: Joi.string().required().messages({
        "any.required": "NO_PUBLISHER_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      writer: Joi.string().required().messages({
        "any.required": "NO_WRITER_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      pageAmt: Joi.string().required().messages({
        "any.required": "NO_PAGEAMT_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      categoryId: Joi.string().required().messages({
        "any.required": "NO_CATEGORYID_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      synopsis: Joi.string().required().messages({
        "any.required": "NO_SYNOPSIS_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      releaseDate: Joi.date().required().messages({
        "any.required": "NO_RELEASEDATE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    let newPublisherId = undefined;
    let newWriterId = undefined;
    try {
      if (!req.files?.length || (req.files?.length as number) < 2) {
        throw "400|LACK_OF_FILES";
      }
      const book = (req.files as any)[0];
      const cover = (req.files as any)[1];

      const body = req.body as ICreateUpdateBodyParams;

      const { error } = createBookSchema.validate(body);
      if (!!error) throw error.message;

      const { publisher, isNew: isNewPublisher } =
        await PublisherRepository.createPublisherIfNotExist({
          name: body.publisher,
        });

      if (isNewPublisher) newPublisherId = publisher.id;

      const { writer, isNew: isNewWriter } =
        await WriterRepository.createWriterIfNotExist({
          name: body.writer,
        });
      if (isNewWriter) newWriterId = writer.id;

      const params = {
        title: body.title,
        categoryId: parseInt(body.categoryId),
        pageAmt: parseInt(body.pageAmt),
        synopsis: body.synopsis,
        publisherId: publisher.id,
        writerId: writer.id,
        bookName: book.filename,
        coverImage: cover.filename,
        releaseDate: new Date(body.releaseDate),
      };

      const books = await BookRepository.createBook(params);

      resp.json(successResponse(books));
    } catch (error) {
      console.error(error);
      if (!!newPublisherId)
        PublisherRepository.deletePublisherById(newPublisherId);
      if (!!newWriterId) WriterRepository.deleteWriterById(newWriterId);

      resp.json(errorResponse(error + ""));
    }
  }

  static async update(req: Request, resp: Response) {
    const updateBookSchema = Joi.object<ICreateUpdateBodyParams>({
      title: Joi.string().messages({
        "any.required": "NO_TITLE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      publisher: Joi.string().messages({
        "any.required": "NO_PUBLISHER_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      writer: Joi.string().messages({
        "any.required": "NO_WRITER_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      pageAmt: Joi.number().messages({
        "any.required": "NO_PAGEAMT_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      categoryId: Joi.number().messages({
        "any.required": "NO_CATEGORYID_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      synopsis: Joi.string().messages({
        "any.required": "NO_SYNOPSIS_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
      releaseDate: Joi.date().messages({
        "any.required": "NO_RELEASEDATE_ERROR",
        "string.base": "NAME_MUST_BE_STRING",
      }),
    });

    let newPublisherId = undefined;
    let newWriterId = undefined;

    try {
      const { id } = req.params;
      const oldBook = await BookRepository.getBookById(parseInt(id));

      if (!oldBook) {
        resp.json(errorResponse("404|BOOK_NOT_FOUND"));
        return;
      }

      const book = (req.files as any)?.[0];
      const coverImage = (req.files as any)?.[1];

      if (!id) throw `ID_NOT_PROVIDED`;

      const body: ICreateUpdateBodyParams = req.body;

      const { publisher, isNew: isNewPublisher } =
        await PublisherRepository.createPublisherIfNotExist({
          name: body.publisher,
        });

      if (isNewPublisher) newPublisherId = publisher.id;

      const { writer, isNew: isNewWriter } =
        await WriterRepository.createWriterIfNotExist({
          name: body.writer,
        });
      if (isNewWriter) newWriterId = writer.id;

      const { error } = updateBookSchema.validate(body);
      if (!!error) throw error.message;

      const updateBookParams: TUpdateBookBody = {
        categoryId: parseInt(body.categoryId),
        pageAmt: parseInt(body.pageAmt),
        publisherId: publisher.id,
        writerId: writer.id,
        releaseDate: new Date(body.releaseDate),
        synopsis: body.synopsis,
        title: body.title,
      };

      if (!!book) {
        updateBookParams.bookName = book.filename;
        IOLib.delete(oldBook.bookName);
      }
      if (!!coverImage) {
        updateBookParams.coverImage = coverImage.filename;
        IOLib.delete(oldBook.coverImage);
      }

      const books = await BookRepository.updateBook(
        parseInt(id),
        updateBookParams
      );
      resp.json(successResponse(books));
    } catch (error) {
      console.error(error);

      if (!!newPublisherId)
        PublisherRepository.deletePublisherById(newPublisherId);
      if (!!newWriterId) WriterRepository.deleteWriterById(newWriterId);

      resp.json(errorResponse(error + ""));
    }
  }

  static async getAll(req: Request, resp: Response) {
    try {
      const { offset, limit, term } = req.query;

      const books = await BookRepository.getBooks({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
      });

      const formattedBooks = books.map((book) => ({
        ...book,
        coverImage: `${process.env.BACKEND_URL}/files/${book.coverImage}`,
        bookUrl: `${process.env.BACKEND_URL}/files/${book.bookName}`,
      }));
      resp.json(successResponse(formattedBooks));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getContinueReading(req: Request, resp: Response) {
    try {
      const { offset, limit, term, userId } = req.query;

      if (!userId) throw "400|NO_USER_ID_PROVIDED_ERROR";

      const books = await BookRepository.getContinueReadingBooks({
        ...getDefaultOffsetAndLimit(offset as string, limit as string),
        term: term as string,
        userId: parseInt(userId as string),
      });

      const formattedBooks = books.map((book) => ({
        ...book,
        coverImage: `${process.env.BACKEND_URL}/files/${book.coverImage}`,
        bookUrl: `${process.env.BACKEND_URL}/files/${book.bookName}`,
      }));
      resp.json(successResponse(formattedBooks));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async getById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      if (!id) throw `ID_NOT_PROVIDED`;

      const { userId } = req.query;

      const book = await BookRepository.getBookById(
        parseInt(id as string),
        parseInt(userId + "")
      );
      const formattedBook = {
        ...book,
        coverImage: `${process.env.BACKEND_URL}/files/${book.coverImage}`,
        bookUrl: `${process.env.BACKEND_URL}/files/${book.bookName}`,
      };
      resp.json(successResponse(formattedBook));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params;

      if (!id) throw `ID_NOT_PROVIDED`;

      const books = await BookRepository.deleteBookById(parseInt(id as string));

      resp.json(successResponse(books));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default BookController;
