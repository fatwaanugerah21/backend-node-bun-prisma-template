/*
  Warnings:

  - You are about to drop the column `subDistrictName` on the `Voter` table. All the data in the column will be lost.
  - Added the required column `subdistrictName` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Voter_districtName_fkey` ON `Voter`;

-- DropIndex
DROP INDEX `Voter_subDistrictName_fkey` ON `Voter`;

-- AlterTable
ALTER TABLE `Voter` DROP COLUMN `subDistrictName`,
    ADD COLUMN `subdistrictName` VARCHAR(191) NOT NULL;
