/*
  Warnings:

  - Made the column `isKip` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `districtName` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subdistrictName` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vottingPlaceNumber` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `individualCardNumber` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `realVoter` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coordinatorName` on table `Responsibler` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Responsibler` MODIFY `isKip` VARCHAR(191) NOT NULL DEFAULT 'KIP',
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
