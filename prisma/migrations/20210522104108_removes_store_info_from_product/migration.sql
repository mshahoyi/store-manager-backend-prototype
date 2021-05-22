/*
  Warnings:

  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_ibfk_2`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `storeId`;
