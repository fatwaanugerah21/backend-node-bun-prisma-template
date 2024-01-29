/*
  Warnings:

  - You are about to alter the column `isKip` on the `Responsibler` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Responsibler` MODIFY `isKip` BOOLEAN NOT NULL DEFAULT false;
