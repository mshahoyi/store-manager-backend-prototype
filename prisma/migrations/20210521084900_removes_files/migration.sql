/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `Store` DROP COLUMN `logo`;
