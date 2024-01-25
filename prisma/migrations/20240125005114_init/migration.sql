/*
  Warnings:

  - You are about to drop the column `material` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `description` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `material`,
    ADD COLUMN `description` LONGTEXT NOT NULL;
