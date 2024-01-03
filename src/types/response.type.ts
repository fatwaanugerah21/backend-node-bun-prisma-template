export type TResponse<T> = {
  code: number;
  status: "SUCCESS" | "FAILED";
  description?: string;
  data?: T;
};
