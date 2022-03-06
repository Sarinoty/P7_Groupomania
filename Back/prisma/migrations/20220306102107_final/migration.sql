/*
  Warnings:

  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Friends` DROP FOREIGN KEY `Friends_userLikerId_fkey`;

-- DropTable
DROP TABLE `Friends`;
