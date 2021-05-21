/*
  Warnings:

  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Store` ADD COLUMN `logo` VARCHAR(191) NOT NULL;
