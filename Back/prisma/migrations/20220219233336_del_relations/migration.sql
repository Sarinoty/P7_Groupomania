/*
  Warnings:

  - You are about to drop the `_CommentsToLikesComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `_CommentsToLikesComment` DROP FOREIGN KEY `_CommentsToLikesComment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CommentsToLikesComment` DROP FOREIGN KEY `_CommentsToLikesComment_ibfk_2`;

-- DropTable
DROP TABLE `_CommentsToLikesComment`;
