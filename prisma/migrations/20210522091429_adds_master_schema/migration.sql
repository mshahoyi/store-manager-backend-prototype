/*
  Warnings:

  - You are about to drop the column `storeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_ibfk_2`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `storeId`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `storeId`;

-- DropTable
DROP TABLE `Store`;
