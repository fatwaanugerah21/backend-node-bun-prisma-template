import { Prisma, UserRole } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";

export type TCreateUserBody = {
  name: string;
  username: string;
  email: string;
  password: string;
  birthDate: Date;
  phoneNumber: string;
  role: UserRole;
};

class UserRepository {
  static userSelect: Prisma.UserSelect = {
    id: true,
    name: true,
    username: true,
    birthDate: true,
    email: true,
    phoneNumber: true,
    role: true,
  };

  static async checkUserExist(id: number) {
    try {
      const resp = await DatabaseLib.models.user.count({
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

  static async createUser(data: TCreateUserBody) {
    try {
      const resp = await DatabaseLib.models.user.create({
        select: this.userSelect,
        data,
      });
      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUsers() {
    try {
      const resp = await DatabaseLib.models.user.findMany({
        select: this.userSelect,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUser(username: string) {
    try {
      const resp = await DatabaseLib.models.user.findFirst({
        where: {
          username,
        },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default UserRepository;
