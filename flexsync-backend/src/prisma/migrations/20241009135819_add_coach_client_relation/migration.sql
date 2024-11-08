/*
  Warnings:

  - You are about to drop the column `coach_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_coach_id_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `coach_id`;

-- CreateTable
CREATE TABLE `CoachClientRelation` (
    `coach_id` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,

    INDEX `CoachClientRelation_client_id_idx`(`client_id`),
    PRIMARY KEY (`coach_id`, `client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CoachClientRelation` ADD CONSTRAINT `CoachClientRelation_coach_id_fkey` FOREIGN KEY (`coach_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachClientRelation` ADD CONSTRAINT `CoachClientRelation_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
