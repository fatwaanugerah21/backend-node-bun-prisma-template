import DatabaseLib from "../libs/database.lib";
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

  static async getUser(username: string) {
    try {
      var resp = await DatabaseLib.models.user.findFirst({
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

export default UserService;
