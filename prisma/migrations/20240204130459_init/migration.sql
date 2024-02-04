-- DropForeignKey
ALTER TABLE `ResponsiblerVoter` DROP FOREIGN KEY `ResponsiblerVoter_responsiblerId_fkey`;

-- DropForeignKey
ALTER TABLE `ResponsiblerVoter` DROP FOREIGN KEY `ResponsiblerVoter_voterId_fkey`;

-- AddForeignKey
ALTER TABLE `ResponsiblerVoter` ADD CONSTRAINT `ResponsiblerVoter_voterId_fkey` FOREIGN KEY (`voterId`) REFERENCES `Voter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResponsiblerVoter` ADD CONSTRAINT `ResponsiblerVoter_responsiblerId_fkey` FOREIGN KEY (`responsiblerId`) REFERENCES `Responsibler`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
