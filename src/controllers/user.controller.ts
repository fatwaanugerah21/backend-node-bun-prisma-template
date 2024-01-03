import { Request, Response } from "express";

import UserService from "../services/user.service";
import { errorResponse, successResponse } from "../utils/responses.util";
import { TCreateUserBody } from "../types/user.type";
import BcryptLib from "../libs/bcrypt.lib";

class UserController {
  static async createUser(req: Request, resp: Response) {
    try {
      const data = req.body as TCreateUserBody;

      const hashedPassword = BcryptLib.hashPassword(data.password);
      data.password = hashedPassword;
      const user = await UserService.createUser(data);

      resp.json(successResponse(user));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error("Error: ", error);
    }
  }
}

export default UserController;
