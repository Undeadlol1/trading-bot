-- AlterTable
ALTER TABLE "BuySellRepeatBot" ADD COLUMN     "hasBought" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSold" BOOLEAN NOT NULL DEFAULT false;
