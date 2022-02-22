/*
  Warnings:

  - You are about to drop the `LikesComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikesPostToPosts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `LikesPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_LikesPostToPosts` DROP FOREIGN KEY `_LikesPostToPosts_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_LikesPostToPosts` DROP FOREIGN KEY `_LikesPostToPosts_ibfk_2`;

-- DropIndex
DROP INDEX `Comments_postId_fkey` ON `Comments`;

-- AlterTable
ALTER TABLE `LikesPost` ADD COLUMN `postId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `LikesComment`;

-- DropTable
DROP TABLE `_LikesPostToPosts`;
