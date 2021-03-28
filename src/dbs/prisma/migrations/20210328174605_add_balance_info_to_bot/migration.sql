/*
  Warnings:

  - Added the required column `initialBalance` to the `BuySellRepeatBot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentBalance` to the `BuySellRepeatBot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuySellRepeatBot" ADD COLUMN     "initialBalance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currentBalance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isPaperTradingEnabled" BOOLEAN NOT NULL DEFAULT false;
