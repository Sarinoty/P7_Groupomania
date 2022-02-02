/*
  Warnings:

  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `userId`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Posts` DROP COLUMN `userId`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Likes`;

-- CreateTable
CREATE TABLE `LikesPost` (
    `likeId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikesComment` (
    `likeId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friends` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userLikerId` INTEGER NOT NULL,
    `userLikedId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LikesPostToPosts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LikesPostToPosts_AB_unique`(`A`, `B`),
    INDEX `_LikesPostToPosts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CommentsToLikesComment` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CommentsToLikesComment_AB_unique`(`A`, `B`),
    INDEX `_CommentsToLikesComment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_userLikerId_fkey` FOREIGN KEY (`userLikerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikesPostToPosts` ADD FOREIGN KEY (`A`) REFERENCES `LikesPost`(`likeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikesPostToPosts` ADD FOREIGN KEY (`B`) REFERENCES `Posts`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommentsToLikesComment` ADD FOREIGN KEY (`A`) REFERENCES `Comments`(`comId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommentsToLikesComment` ADD FOREIGN KEY (`B`) REFERENCES `LikesComment`(`likeId`) ON DELETE CASCADE ON UPDATE CASCADE;
