/*
  Warnings:

  - You are about to drop the column `minimumCorrectnessToPass` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestion` DROP FOREIGN KEY `QuizQuestion_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestionOptions` DROP FOREIGN KEY `QuizQuestionOptions_quizQuestionId_fkey`;

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `minimumCorrectnessToPass`;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestionOptions` ADD CONSTRAINT `QuizQuestionOptions_quizQuestionId_fkey` FOREIGN KEY (`quizQuestionId`) REFERENCES `QuizQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
