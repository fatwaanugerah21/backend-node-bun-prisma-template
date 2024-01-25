-- DropForeignKey
ALTER TABLE `Curriculum` DROP FOREIGN KEY `Curriculum_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
