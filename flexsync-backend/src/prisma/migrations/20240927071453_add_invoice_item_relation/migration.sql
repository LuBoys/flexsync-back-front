/*
  Warnings:

  - Added the required column `option_id` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InvoiceItem` ADD COLUMN `option_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `InvoiceItem` ADD CONSTRAINT `InvoiceItem_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `OfferOption`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
