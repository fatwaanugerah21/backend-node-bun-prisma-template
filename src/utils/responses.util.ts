import { TResponse } from "../types/response.type";

export function successResponse(data: any): TResponse<any> {
  var response: TResponse<any> = {
    code: 200,
    status: "SUCCESS",
    data,
  };

  return response;
}

export function errorResponse(
  code: number,
  description: string
): TResponse<any> {
  var response: TResponse<any> = {
    status: "FAILED",
    code,
    description,
  };

  return response;
}
