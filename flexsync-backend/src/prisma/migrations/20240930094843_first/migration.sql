-- CreateTable
CREATE TABLE `Club` (
    `club_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`club_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserClub` (
    `user_id` INTEGER NOT NULL,
    `club_id` INTEGER NOT NULL,

    INDEX `UserClub_club_id_idx`(`club_id`),
    PRIMARY KEY (`user_id`, `club_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `profile_picture` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `specializations` VARCHAR(191) NULL,
    `certifications` VARCHAR(191) NULL,
    `experience_years` INTEGER NULL,
    `location` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `coach_id` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_role_name_key`(`role_name`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `currency_id` INTEGER NOT NULL AUTO_INCREMENT,
    `currency_code` VARCHAR(191) NOT NULL,
    `currency_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Currency_currency_code_key`(`currency_code`),
    PRIMARY KEY (`currency_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoachOffer` (
    `offer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `coach_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `base_price` DECIMAL(10, 2) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `CoachOffer_coach_id_idx`(`coach_id`),
    INDEX `CoachOffer_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`offer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfferOption` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `offer_id` INTEGER NOT NULL,
    `option_name` VARCHAR(191) NOT NULL,
    `option_description` VARCHAR(191) NULL,
    `option_price` DECIMAL(10, 2) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `OfferOption_offer_id_idx`(`offer_id`),
    INDEX `OfferOption_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `coach_id` INTEGER NOT NULL,
    `offer_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('active', 'inactive', 'cancelled') NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Subscription_client_id_idx`(`client_id`),
    INDEX `Subscription_coach_id_idx`(`coach_id`),
    INDEX `Subscription_offer_id_idx`(`offer_id`),
    INDEX `Subscription_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionOption` (
    `subscription_option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,
    `option_price` DECIMAL(10, 2) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SubscriptionOption_subscription_id_idx`(`subscription_id`),
    INDEX `SubscriptionOption_option_id_idx`(`option_id`),
    INDEX `SubscriptionOption_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`subscription_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `payment_method_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `method_type` VARCHAR(191) NOT NULL,
    `details` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PaymentMethod_user_id_idx`(`user_id`),
    PRIMARY KEY (`payment_method_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `payment_method_id` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `status` ENUM('successful', 'failed', 'pending') NOT NULL,
    `stripe_payment_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Payment_subscription_id_idx`(`subscription_id`),
    INDEX `Payment_payment_method_id_idx`(`payment_method_id`),
    INDEX `Payment_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `invoice_number` VARCHAR(191) NOT NULL,
    `invoice_date` DATETIME(3) NOT NULL,
    `pdf_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Invoice_payment_id_key`(`payment_id`),
    UNIQUE INDEX `Invoice_invoice_number_key`(`invoice_number`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceItem` (
    `invoice_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `option_id` INTEGER NOT NULL,

    PRIMARY KEY (`invoice_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Measurement` (
    `measurement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `weight` DECIMAL(5, 2) NULL,
    `height` DECIMAL(5, 2) NULL,
    `body_fat_percentage` DECIMAL(5, 2) NULL,
    `muscle_mass` DECIMAL(5, 2) NULL,
    `other_metrics` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Measurement_user_id_idx`(`user_id`),
    PRIMARY KEY (`measurement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationSql` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `NotificationSql_user_id_idx`(`user_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserClub` ADD CONSTRAINT `UserClub_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClub` ADD CONSTRAINT `UserClub_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `Club`(`club_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_coach_id_fkey` FOREIGN KEY (`coach_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgressPicture` ADD CONSTRAINT `ProgressPicture_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOffer` ADD CONSTRAINT `CoachOffer_coach_id_fkey` FOREIGN KEY (`coach_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoachOffer` ADD CONSTRAINT `CoachOffer_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`currency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfferOption` ADD CONSTRAINT `OfferOption_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `CoachOffer`(`offer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfferOption` ADD CONSTRAINT `OfferOption_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`currency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_coach_id_fkey` FOREIGN KEY (`coach_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_offer_id_fkey` FOREIGN KEY (`offer_id`) REFERENCES `CoachOffer`(`offer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`currency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionOption` ADD CONSTRAINT `SubscriptionOption_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`subscription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionOption` ADD CONSTRAINT `SubscriptionOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `OfferOption`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionOption` ADD CONSTRAINT `SubscriptionOption_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`currency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentMethod` ADD CONSTRAINT `PaymentMethod_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`subscription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `PaymentMethod`(`payment_method_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`currency_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`payment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceItem` ADD CONSTRAINT `InvoiceItem_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `OfferOption`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceItem` ADD CONSTRAINT `InvoiceItem_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `Invoice`(`invoice_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationSql` ADD CONSTRAINT `NotificationSql_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
