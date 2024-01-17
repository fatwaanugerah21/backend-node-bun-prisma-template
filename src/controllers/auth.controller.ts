import { Request, Response } from "express";
import BcryptLib from "../libs/bcrypt.lib";
import UserRepository, {
  TCreateUserBody,
} from "../repositories/user.repository";
import { errorResponse, successResponse } from "../utils/responses.util";
import JwtLib from "../libs/jwt.lib";
import Joi from "joi";
import { UserRole } from "@prisma/client";

interface ILoginSchema {
  username: string;
  password: string;
}

class AuthController {
  static async signup(req: Request, resp: Response) {
    const signupSchema = Joi.object<TCreateUserBody>({
      name: Joi.string().required().messages({
        "any.required": "NO_NAME_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      email: Joi.string().required().messages({
        "any.required": "NO_EMAIL_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      birthDate: Joi.string().required().messages({
        "any.required": "NO_BIRTHDATE_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      phoneNumber: Joi.string().required().messages({
        "any.required": "NO_PHONENUMBER_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      role: Joi.string().required().messages({
        "any.required": "NO_ROLE_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      username: Joi.string().required().messages({
        "any.required": "NO_USERNAME_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      password: Joi.string().required().messages({
        "any.required": "NO_PASSWORD_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
    });
    try {
      const data = req.body as TCreateUserBody;

      const { error } = await signupSchema.validate(data);
      if (!!error) throw `400|${error.message}`;

      const hashedPassword = BcryptLib.hashPassword(data.password);
      data.password = hashedPassword;
      const user = await UserRepository.createUser(data);

      resp.json(successResponse(user));
    } catch (error) {
      console.error("Error: ", error);
      resp.json(errorResponse(error + ""));
    }
  }

  static async login(req: Request, res: Response) {
    const loginSchema = Joi.object<ILoginSchema>({
      username: Joi.string().required().messages({
        "any.required": "NO_USERNAME_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
      password: Joi.string().required().messages({
        "any.required": "NO_PASSWORD_ERROR",
        "string.base": "USERNAME_MUST_BE_STRING",
      }),
    });
    try {
      const params = req.body;
      const { error } = await loginSchema.validate(params);

      if (!!error) throw `401|${error.message}`;

      const { username, password } = params;

      const user = await UserRepository.getUser(username);

      if (!user) throw new Error("404|USER_NOT_FOUND");

      const isValidPassword = BcryptLib.comparePassword(
        password,
        user?.password!
      );
      if (!isValidPassword) throw new Error("401|WRONG_PASSWORD");

      const jwtToken = await JwtLib.createToken({ role: "admin", id: user.id });

      res.json(successResponse(jwtToken));
    } catch (error) {
      console.error(error);
      res.json(errorResponse(error + ""));
    }
  }
}

export default AuthController;
