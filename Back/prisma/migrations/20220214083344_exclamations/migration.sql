-- AlterTable
ALTER TABLE `Posts` MODIFY `imgContent` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `imageUrl` VARCHAR(255) NULL,
    MODIFY `bio` VARCHAR(255) NULL;
