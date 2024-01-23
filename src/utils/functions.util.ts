import { Request } from "express";
import { SIGNED_IN_USER_REQ_KEY } from "../constants/constants";
import { TJwtPayload } from "../libs/jwt.lib";
import { TFetchAllParams } from "../types/indexType";

export function getDefaultStartAndOffset(
  offset?: string,
  limit?: string
): TFetchAllParams {
  let finalOffset = getDefaultQueryOffset();
  let finalLimit = getDefaultQueryLimit();

  if (!!offset || offset === "0") finalOffset = parseInt(offset);
  if (!!limit || limit === "0") finalLimit = parseInt(limit);

  return { offset: finalOffset, limit: finalLimit };
}

export function getDefaultQueryLimit(): number {
  return 1000;
}

export function getDefaultQueryOffset(): number {
  return 0;
}

export function isParseableInteger(str: string) {
  // Use Number.parseInt() to parse the string as an integer
  const parsedValue = Number.parseInt(str, 10);

  // Check if the parsed value is a valid integer
  return Number.isInteger(parsedValue);
}

export function getUserIdFromRequest(req: Request): TJwtPayload {
  return (req as any)[SIGNED_IN_USER_REQ_KEY];
}

export function getFileUrl(filename: string): string {
  return `${process.env.BACKEND_URL}/files/${filename}`;
}
