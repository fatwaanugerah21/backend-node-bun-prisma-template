/*
  Warnings:

  - You are about to drop the `VotingPlaceNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VotingPlaceNumber` DROP FOREIGN KEY `VotingPlaceNumber_subdistrictId_fkey`;

-- DropTable
DROP TABLE `VotingPlaceNumber`;
