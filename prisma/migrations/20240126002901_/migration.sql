/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurriculumSequence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Glosarium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publisher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestionOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Writer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_publisherId_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_writerId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Curriculum` DROP FOREIGN KEY `Curriculum_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `CurriculumSequence` DROP FOREIGN KEY `CurriculumSequence_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_askerId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestion` DROP FOREIGN KEY `QuizQuestion_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestionOptions` DROP FOREIGN KEY `QuizQuestionOptions_quizQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCourse` DROP FOREIGN KEY `UserCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `UserCourse` DROP FOREIGN KEY `UserCourse_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRead` DROP FOREIGN KEY `UserRead_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRead` DROP FOREIGN KEY `UserRead_userId_fkey`;

-- DropTable
DROP TABLE `Article`;

-- DropTable
DROP TABLE `Book`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Comment`;

-- DropTable
DROP TABLE `Course`;

-- DropTable
DROP TABLE `Curriculum`;

-- DropTable
DROP TABLE `CurriculumSequence`;

-- DropTable
DROP TABLE `Glosarium`;

-- DropTable
DROP TABLE `Publisher`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `Quiz`;

-- DropTable
DROP TABLE `QuizQuestion`;

-- DropTable
DROP TABLE `QuizQuestionOptions`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserCourse`;

-- DropTable
DROP TABLE `UserRead`;

-- DropTable
DROP TABLE `Writer`;

-- CreateTable
CREATE TABLE `District` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `District_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subdistrict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `districtName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subdistrict_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VotingPlaceNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `subdistrictId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `districtName` VARCHAR(191) NOT NULL,
    `subDistrictName` VARCHAR(191) NOT NULL,
    `familyCardNumber` VARCHAR(191) NOT NULL,
    `individualCardNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `birthPlace` VARCHAR(191) NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `marriageStatus` ENUM('B', 'S') NOT NULL,
    `gender` ENUM('L', 'P') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `neighbourhood` VARCHAR(191) NOT NULL,
    `hamlet` VARCHAR(191) NOT NULL,
    `pollingPlaceNumber` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subdistrict` ADD CONSTRAINT `Subdistrict_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `District`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotingPlaceNumber` ADD CONSTRAINT `VotingPlaceNumber_subdistrictId_fkey` FOREIGN KEY (`subdistrictId`) REFERENCES `Subdistrict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voter` ADD CONSTRAINT `Voter_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `District`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voter` ADD CONSTRAINT `Voter_subDistrictName_fkey` FOREIGN KEY (`subDistrictName`) REFERENCES `Subdistrict`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
