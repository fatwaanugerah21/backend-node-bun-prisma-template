import { UserRole } from "@prisma/client";

export type TCreateUserBody = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
};
