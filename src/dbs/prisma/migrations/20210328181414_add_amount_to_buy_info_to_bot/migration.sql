/*
  Warnings:

  - Added the required column `amountToBuy` to the `BuySellRepeatBot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuySellRepeatBot" ADD COLUMN     "amountToBuy" DOUBLE PRECISION NOT NULL;
