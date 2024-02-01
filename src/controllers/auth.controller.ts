import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";

class AuthController {
  static password = "";
  static async getPassword(req: Request, resp: Response) {
    try {
      resp.json(successResponse(this.password));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(this.password));
    }
  }

  static async setPassword(req: Request, resp: Response) {
    try {
      const { password } = req.query;
      this.password = password as string;

      resp.json(successResponse("Success changing password"));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse("Failed changing password"));
    }
  }
}

export default AuthController;
