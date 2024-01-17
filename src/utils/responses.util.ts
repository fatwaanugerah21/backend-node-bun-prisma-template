import { TResponse } from "../types/response.type";
import { isParseableInteger } from "./functions.util";

export function successResponse(data: any): TResponse<any> {
  var response: TResponse<any> = {
    code: 200,
    data,
    message: "SUCCESS",
  };

  return response;
}

export function errorResponse(message: string): TResponse<any> {
  const splits = message.split("|");
  const codeStr = splits[0];

  const code = isParseableInteger(codeStr) ? parseInt(codeStr) : 400;
  var response: TResponse<any> = {
    code,
    message: splits[1] || splits[0],
    data: null,
  };

  return response;
}
