-- CreateTable
CREATE TABLE `CurriculumSequence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('QUIZ', 'ARTICLE') NOT NULL,
    `sequenceNumber` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,
    `quizId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurriculumSequence` ADD CONSTRAINT `CurriculumSequence_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
