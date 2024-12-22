/*
  Warnings:

  - You are about to drop the column `amountdiamonds` on the `products` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `amountdiamonds`,
    ADD COLUMN `amount` INTEGER NOT NULL;
