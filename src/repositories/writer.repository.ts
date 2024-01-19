import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateWriterBody = {
  name: string;
};

export type TGetWritersParams = {
  term?: string;
};

class WriterRepository {
  static writerSelect: Prisma.WriterSelect = {
    id: true,
    name: true,
  };

  static async createWriterIfNotExist(data: TCreateWriterBody) {
    try {
      const writer = await DatabaseLib.models.writer.findFirst({
        where: { name: data.name },
      });
      if (!!writer) {
        return { writer, isNew: false };
      }

      const resp = await DatabaseLib.models.writer.create({
        data,
      });

      return { writer: resp, isNew: true };
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async createWriter(data: TCreateWriterBody) {
    try {
      const resp = await DatabaseLib.models.writer.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateWriter(id: number, data: TCreateWriterBody) {
    try {
      const resp = await DatabaseLib.models.writer.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteWriterById(id: number) {
    try {
      const resp = await DatabaseLib.models.writer.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getWriters({
    limit,
    offset,
    term,
  }: TGetWritersParams & TFetchAllParams) {
    console.log("term: ", term);

    try {
      const resp = await DatabaseLib.models.writer.findMany({
        skip: offset,
        take: limit,
        select: this.writerSelect,
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

  static async getWriterById(id: number) {
    try {
      const resp = await DatabaseLib.models.writer.findFirst({
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

export default WriterRepository;
