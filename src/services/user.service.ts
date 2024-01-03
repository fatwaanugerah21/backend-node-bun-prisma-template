import { User } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TErrorMsg } from "../constants/error-msgs.constant";
import { TCreateUserBody } from "../types/user.type";

class UserService {
  static async createUser(data: TCreateUserBody) {
    try {
      var resp = await DatabaseLib.models.user.create({ data });
      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getUsers() {
    try {
      var users = await DatabaseLib.models.user.findMany({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: number) {
    try {
      var user = await DatabaseLib.models.user.findFirst({
        where: { id },
        select: {
          name: true,
          email: true,
          phoneNumber: true,
          role: true,
        },
      });

      if (!user) {
        throw "NOT_FOUND" as TErrorMsg;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(email: string) {
    try {
      var user = await DatabaseLib.models.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw "NOT_FOUND" as TErrorMsg;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id: number) {
    try {
      var resp = await DatabaseLib.models.user.delete({ where: { id } });
      return resp;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id: number, data: User) {
    try {
      const user = await DatabaseLib.models.user.update({
        data,
        where: { id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
