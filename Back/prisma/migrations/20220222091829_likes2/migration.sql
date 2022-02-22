/*
  Warnings:

  - You are about to drop the `LikesPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `LikesPost`;

-- CreateTable
CREATE TABLE `Likes` (
    `likeId` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
