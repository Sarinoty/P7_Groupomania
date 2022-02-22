-- DropIndex
DROP INDEX `Comments_authorId_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `Comments_postId_fkey` ON `Comments`;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;
