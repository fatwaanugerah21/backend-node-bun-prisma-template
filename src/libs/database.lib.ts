import { PrismaClient } from "@prisma/client";

class DatabaseLib {
  public static models = new PrismaClient();
}

export default DatabaseLib;
