-- CreateTable
CREATE TABLE `Responsibler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isKip` BOOLEAN NOT NULL,
    `districtName` VARCHAR(191) NOT NULL,
    `subdistrictName` VARCHAR(191) NOT NULL,
    `vottingPlaceNumber` VARCHAR(191) NOT NULL,
    `individualCardNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `realVoter` VARCHAR(191) NOT NULL,
    `coordinatorName` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResponsiblerVoter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voterId` INTEGER NOT NULL,
    `responsiblerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ResponsiblerVoter` ADD CONSTRAINT `ResponsiblerVoter_voterId_fkey` FOREIGN KEY (`voterId`) REFERENCES `Voter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResponsiblerVoter` ADD CONSTRAINT `ResponsiblerVoter_responsiblerId_fkey` FOREIGN KEY (`responsiblerId`) REFERENCES `Responsibler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
