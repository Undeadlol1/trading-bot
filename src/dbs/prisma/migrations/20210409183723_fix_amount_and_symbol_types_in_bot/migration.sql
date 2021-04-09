/*
  Warnings:

  - You are about to drop the column `symbolToBuy` on the `BuySellRepeatBot` table. All the data in the column will be lost.
  - You are about to drop the column `symbolToBuyFor` on the `BuySellRepeatBot` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `BuySellRepeatBot` table. All the data in the column will be lost.
  - Added the required column `symbol` to the `BuySellRepeatBot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `BuySellRepeatBot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuySellRepeatBot" DROP COLUMN "symbolToBuy",
DROP COLUMN "symbolToBuyFor",
DROP COLUMN "amount",
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
