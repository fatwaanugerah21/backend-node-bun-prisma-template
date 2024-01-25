/*
  Warnings:

  - You are about to drop the column `sequenceNumber` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sequenceNumber` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_quizId_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `sequenceNumber`;

-- AlterTable
ALTER TABLE `CurriculumSequence` MODIFY `articleId` INTEGER NULL,
    MODIFY `quizId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `sequenceNumber`;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
