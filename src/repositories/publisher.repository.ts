import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreatePublisherBody = {
  name: string;
};

export type TGetPublishersParams = {
  term?: string;
};

class PublisherRepository {
  static publisherSelect: Prisma.PublisherSelect = {
    id: true,
    name: true,
  };

  static async createPublisherIfNotExist(data: TCreatePublisherBody) {
    try {
      const publisher = await DatabaseLib.models.publisher.findFirst({
        where: { name: data.name },
      });
      if (!!publisher) {
        return { publisher, isNew: false };
      }
      const resp = await DatabaseLib.models.publisher.create({
        data,
      });

      return { publisher: resp, isNew: true };
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async createPublisher(data: TCreatePublisherBody) {
    try {
      const resp = await DatabaseLib.models.publisher.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updatePublisher(id: number, data: TCreatePublisherBody) {
    try {
      const resp = await DatabaseLib.models.publisher.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deletePublisherById(id: number) {
    try {
      const resp = await DatabaseLib.models.publisher.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getPublishers({
    limit,
    offset,
    term,
  }: TGetPublishersParams & TFetchAllParams) {
    console.log("term: ", term);

    try {
      const resp = await DatabaseLib.models.publisher.findMany({
        skip: offset,
        take: limit,
        select: this.publisherSelect,
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

  static async getPublisherById(id: number) {
    try {
      const resp = await DatabaseLib.models.publisher.findFirst({
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

export default PublisherRepository;
