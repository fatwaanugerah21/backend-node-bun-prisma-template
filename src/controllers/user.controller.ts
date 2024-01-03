import { Request, Response } from "express";

import UserService from "../services/user.service";
import { errorResponse, successResponse } from "../utils/responses.util";
import { TErrorMsg, errorCodes } from "../constants/error-msgs.constant";
import { TCreateUserBody } from "../types/user.type";
import { hashSync, genSaltSync } from "bcryptjs";
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

  static async getUsers(req: Request, resp: Response) {
    try {
      const users = await UserService.getUsers();
      resp.json(successResponse(users));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error("Error: ", error);
    }
  }

  static async getUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));
      resp.json(successResponse(user));
    } catch (error) {
      resp.json(errorResponse(errorCodes[error as TErrorMsg], error + ""));
      console.error("Error: ", error);
    }
  }

  static async putUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log(data);

      const user = await UserService.updateUser(parseInt(id), data);
      resp.json(successResponse(user));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error("Error: ", error);
    }
  }
  static async deleteUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.deleteUser(parseInt(id));
      resp.json(successResponse(user));
    } catch (error) {
      resp.json(errorResponse(400, error + ""));
      console.error("Error: ", error);
    }
  }
}

export default UserController;
