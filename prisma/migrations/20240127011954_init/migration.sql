/*
  Warnings:

  - You are about to alter the column `realVoter` on the `Responsibler` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Responsibler` MODIFY `isKip` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `districtName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `subdistrictName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `vottingPlaceNumber` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `individualCardNumber` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `address` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phoneNumber` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `realVoter` INTEGER NOT NULL DEFAULT 0,
    MODIFY `coordinatorName` VARCHAR(191) NOT NULL DEFAULT '';
