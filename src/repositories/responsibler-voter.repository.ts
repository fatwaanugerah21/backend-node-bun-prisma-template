import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";

export type TCreateResponsiblerVoterBody = {
  voterId: number;
  responsiblerId: number;
};

export type TGetResponsiblerVotersParams = {
  term?: string;
};

class ResponsiblerVoterRepository {
  static async createResponsiblerVoter(data: TCreateResponsiblerVoterBody) {
    try {
      const isExist = await DatabaseLib.models.responsiblerVoter.findFirst({
        where: {
          responsiblerId: data.responsiblerId,
          voterId: data.voterId,
        },
      });

      if (!!isExist) throw "Sudah ada";

      const resp = await DatabaseLib.models.responsiblerVoter.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateResponsiblerVoter(
    id: number,
    data: TCreateResponsiblerVoterBody
  ) {
    try {
      const resp = await DatabaseLib.models.responsiblerVoter.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteAllResponsiblerVoters() {
    try {
      const resp = await DatabaseLib.models.responsiblerVoter.deleteMany({});

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteResponsiblerVoterById(id: number) {
    try {
      const resp = await DatabaseLib.models.responsiblerVoter.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getResponsiblerVoters(responsiblerId: number) {
    try {
      const resp = await DatabaseLib.models.responsiblerVoter.findMany({
        where: {
          responsiblerId,
        },
        orderBy: {
          voter: {
            familyCardNumber: "asc",
          },
        },
        select: {
          id: true,
          responsibler: true,
          voter: {},
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getResponsiblerVoterById(id: number) {
    try {
      const resp = await DatabaseLib.models.responsiblerVoter.findFirst({
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

  static async getResponsiblerVoterDuplicate() {
    try {
      const responsiblerVoters =
        await DatabaseLib.models.responsiblerVoter.findMany({
          select: {
            id: true,
            responsiblerId: true,
            voterId: true,
            responsibler: {
              include: { responsiblerVoters: {} },
            },
            voter: {},
          },
        });

      // Group rows by voterId
      const groupedByVoterId = responsiblerVoters.reduce((acc: any, row) => {
        console.log("row:", row);

        const voterId = row.voterId.toString(); // Convert to string for consistent grouping
        acc[voterId] = acc[voterId] || [];
        acc[voterId].push(row);
        return acc;
      }, {});

      // Filter out groups with only one row
      const duplicateGroups = Object.values(groupedByVoterId).filter(
        (group: any) => group.length > 1
      );

      return duplicateGroups;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default ResponsiblerVoterRepository;
