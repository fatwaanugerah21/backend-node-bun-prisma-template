-- DropForeignKey
ALTER TABLE `Subdistrict` DROP FOREIGN KEY `Subdistrict_districtName_fkey`;

-- DropForeignKey
ALTER TABLE `Voter` DROP FOREIGN KEY `Voter_districtName_fkey`;

-- DropForeignKey
ALTER TABLE `Voter` DROP FOREIGN KEY `Voter_subDistrictName_fkey`;

-- DropForeignKey
ALTER TABLE `VotingPlaceNumber` DROP FOREIGN KEY `VotingPlaceNumber_subdistrictId_fkey`;

-- AddForeignKey
ALTER TABLE `Subdistrict` ADD CONSTRAINT `Subdistrict_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `District`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotingPlaceNumber` ADD CONSTRAINT `VotingPlaceNumber_subdistrictId_fkey` FOREIGN KEY (`subdistrictId`) REFERENCES `Subdistrict`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voter` ADD CONSTRAINT `Voter_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `District`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voter` ADD CONSTRAINT `Voter_subDistrictName_fkey` FOREIGN KEY (`subDistrictName`) REFERENCES `Subdistrict`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
