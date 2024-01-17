import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";
import UserRepository from "../repositories/user.repository";

class UserController {
  static async getUsers(req: Request, resp: Response) {
    try {
      const users = await UserRepository.getUsers();

      resp.json(successResponse(users));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(error + ""));
    }
  }
}

export default UserController;
