import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.util";

let pssd = "";
class AuthController {
  async getPassword(req: Request, resp: Response) {
    try {
      resp.json(successResponse(pssd));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse(pssd));
    }
  }

  async setPassword(req: Request, resp: Response) {
    try {
      const { password } = req.query;
      pssd = password as string;

      resp.json(successResponse("Success changing password"));
    } catch (error) {
      console.error(error);
      resp.json(errorResponse("Failed changing password"));
    }
  }
}

export default AuthController;
