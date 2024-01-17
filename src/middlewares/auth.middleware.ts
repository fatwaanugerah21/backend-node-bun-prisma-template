import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.util";
import JwtLib from "../libs/jwt.lib";

class AuthMiddleware {
  static async mustLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.json(errorResponse("403|UNAUTHORIZED"));
        return;
      }

      const token = authorization?.split(" ")[1];
      if (!token) {
        res.json(errorResponse("403|UNAUTHORIZED"));
        return;
      }

      const userInfo = (await JwtLib.verifyToken(token)) as any;
      req.headers.accessor = userInfo;

      next();
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthMiddleware;
