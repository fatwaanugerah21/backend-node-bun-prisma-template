import { Request, Response } from "express";
import BcryptLib from "../libs/bcrypt.lib";
import UserService from "../services/user.service";
import { errorResponse, successResponse } from "../utils/responses.util";
import JwtLib from "../libs/jwt.lib";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throw new Error("Please provide a valid user name and password");

      const user = await UserService.getUser(username);

      if (!user)
        throw new Error("Please provide a valid user name and password");

      const isValid = BcryptLib.comparePassword(password, user?.password!);
      if (!isValid)
        throw new Error("Please provide a valid user name and password");

      const jwtToken = await JwtLib.createToken({ role: "admin", id: user.id });

      res.json(successResponse(jwtToken));
    } catch (error) {
      console.error(error);
      res.json(errorResponse(400, error + ""));
    }
  }
}

export default AuthController;
