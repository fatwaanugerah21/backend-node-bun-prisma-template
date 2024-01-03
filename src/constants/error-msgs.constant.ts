export type TErrorMsg =
  | "INVALID_DATA_CREATION"
  | "NOT_FOUND"
  | "INVALID_AUTHORIZATION";

export const errorCodes: { [x in TErrorMsg]: number } = {
  INVALID_DATA_CREATION: 400,
  INVALID_AUTHORIZATION: 401,
  NOT_FOUND: 404,
};
