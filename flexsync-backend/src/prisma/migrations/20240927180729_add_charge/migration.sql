-- CreateTable
CREATE TABLE `Workout` (
    `workout_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `exercise_name` VARCHAR(191) NOT NULL,
    `series` INTEGER NOT NULL,
    `repetitions` INTEGER NOT NULL,
    `weight` DECIMAL(5, 2) NOT NULL,
    `workout_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Workout_user_id_idx`(`user_id`),
    PRIMARY KEY (`workout_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProgressPicture` (
    `picture_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `picture_url` VARCHAR(191) NOT NULL,
    `taken_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProgressPicture_user_id_idx`(`user_id`),
    PRIMARY KEY (`picture_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgressPicture` ADD CONSTRAINT `ProgressPicture_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
