/*
  Warnings:

  - You are about to alter the column `isKip` on the `Responsibler` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Responsibler` MODIFY `isKip` VARCHAR(191) NULL DEFAULT '';
