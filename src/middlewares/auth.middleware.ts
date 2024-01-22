import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.util";
import JwtLib from "../libs/jwt.lib";
import { SIGNED_IN_USER_REQ_KEY } from "../constants/constants";
import { getUserIdFromRequest } from "../utils/functions.util";

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
      (req as any)[SIGNED_IN_USER_REQ_KEY] = userInfo;
      next();
    } catch (error) {
      console.error(error);
      res.json(errorResponse("500|PLEASE_CHECK_AUTHORIZATION"));
    }
  }

  // This function should defined after .mustLogin()
  static validateId(
    partKey: string,
    valueKey: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = getUserIdFromRequest(req);

        const userId = (req as any)[partKey]?.[valueKey];

        if (id != userId) {
          res.json(
            errorResponse("400|TOKEN_INVALID_AND_NOT_MATCH_PLEASE_RELOGIN")
          );
          return;
        }

        next();
      } catch (error) {
        console.error(error);
        res.json(errorResponse("500|PLEASE_CHECK_AUTHORIZATION"));
      }
    };
  }
}

export default AuthMiddleware;
