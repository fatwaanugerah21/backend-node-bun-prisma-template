// seed.ts
import { PrismaClient } from "@prisma/client";
import BcryptLib from "../src/libs/bcrypt.lib";

const prisma = new PrismaClient();

async function seed() {
  const password = "test";
  // Seed Users
  await prisma.user.create({
    data: {
      username: "test",
      password: BcryptLib.hashPassword(password),
      // other user properties
    },
  });
  await prisma.user.create({
    data: {
      username: "test2",
      password: BcryptLib.hashPassword("test2"),
      // other user properties
    },
  });

  // Add more seed data as needed

  console.log("Seed data has been inserted successfully.");
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
