/*
  Warnings:

  - You are about to alter the column `date` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `date` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `date` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Posts` MODIFY `date` INTEGER NOT NULL;
