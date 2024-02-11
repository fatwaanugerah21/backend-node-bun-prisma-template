import DatabaseLib from "../libs/database.lib";

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

  static async checkIsDuplicateVoter(voterIndividualNumber: string) {
    try {
      const rvs = await DatabaseLib.models.responsiblerVoter.findMany({
        where: {
          voter: {
            individualCardNumber: voterIndividualNumber,
          },
        },
      });

      return rvs.length > 1;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateResponsiblerVoter(id: number, data: TCreateResponsiblerVoterBody) {
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

  static async getInputtedDistrictAndSubdistricts() {
    try {
      const distinctDistrictAndSubdistrictWithCount = await DatabaseLib.models.voter.groupBy({
        by: ["districtName", "subdistrictName"],
        where: {
          responsiblerVoters: { some: {} },
        },
      });

      return distinctDistrictAndSubdistrictWithCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getTotalResponsiblerVoters() {
    try {
      const count = await DatabaseLib.models.responsiblerVoter.count({});

      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getTotalResponsiblerVotersCountPerSubddistrict(subdistrictName: string) {
    try {
      const count = await DatabaseLib.models.responsiblerVoter.count({
        where: {
          voter: {
            subdistrictName,
          },
        },
      });

      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getResponsiblerVotersPerSubddistrict(subdistrictName: string) {
    try {
      const voters = await DatabaseLib.models.responsiblerVoter.findMany({
        where: {
          voter: {
            subdistrictName,
          },
        },
        select: {
          voter: {
            select: {
              pollingPlaceNumber: true,
            },
          },
        },
      });

      return voters;
    } catch (error) {
      console.error(error);
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
          voter: true,
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

  static async getResponsiblerVoterDuplicate(subdistrictName?: string) {
    try {
      const responsiblerVoters = await DatabaseLib.models.responsiblerVoter.findMany({
        where: {
          voter: {
            subdistrictName,
          },
        },
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
        const voterId = row.voterId.toString(); // Convert to string for consistent grouping
        acc[voterId] = acc[voterId] || [];
        if (!!subdistrictName) {
          if ([row.responsibler.subdistrictName, row.voter.subdistrictName].includes(subdistrictName)) acc[voterId].push(row);
        } else acc[voterId].push(row);
        return acc;
      }, {});

      // Filter out groups with only one row
      const duplicateGroups = Object.values(groupedByVoterId).filter((group: any) => group.length > 1);

      return duplicateGroups;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default ResponsiblerVoterRepository;
