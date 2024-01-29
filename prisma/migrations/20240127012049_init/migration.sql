-- AlterTable
ALTER TABLE `Responsibler` MODIFY `isKip` BOOLEAN NULL DEFAULT false,
    MODIFY `districtName` VARCHAR(191) NULL DEFAULT '',
    MODIFY `subdistrictName` VARCHAR(191) NULL DEFAULT '',
    MODIFY `vottingPlaceNumber` VARCHAR(191) NULL DEFAULT '',
    MODIFY `individualCardNumber` VARCHAR(191) NULL DEFAULT '',
    MODIFY `name` VARCHAR(191) NULL DEFAULT '',
    MODIFY `address` VARCHAR(191) NULL DEFAULT '',
    MODIFY `status` VARCHAR(191) NULL DEFAULT '',
    MODIFY `phoneNumber` VARCHAR(191) NULL DEFAULT '',
    MODIFY `realVoter` INTEGER NULL DEFAULT 0,
    MODIFY `coordinatorName` VARCHAR(191) NULL DEFAULT '';
