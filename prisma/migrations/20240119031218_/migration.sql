/*
  Warnings:

  - You are about to drop the column `bookUrl` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookName` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `bookUrl`,
    ADD COLUMN `bookName` VARCHAR(191) NOT NULL;
