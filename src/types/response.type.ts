export type TResponse<T> = {
  code: number;
  message?: string;
  data?: T;
};
