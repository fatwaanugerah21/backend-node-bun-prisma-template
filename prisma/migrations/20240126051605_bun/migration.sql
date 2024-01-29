/*
  Warnings:

  - You are about to alter the column `marriageStatus` on the `Voter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `gender` on the `Voter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Voter` MODIFY `marriageStatus` VARCHAR(191) NOT NULL,
    MODIFY `gender` VARCHAR(191) NOT NULL;
