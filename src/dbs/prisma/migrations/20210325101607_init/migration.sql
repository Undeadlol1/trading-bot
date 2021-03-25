-- CreateTable
CREATE TABLE "BuySellRepeatBot" (
    "buyAt" DOUBLE PRECISION NOT NULL,
    "sellAt" DOUBLE PRECISION NOT NULL,
    "symbolToBuy" TEXT NOT NULL,
    "symbolToBuyFor" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuySellRepeatBotRunResult" (
    "initialBalance" DOUBLE PRECISION NOT NULL,
    "currentBalance" DOUBLE PRECISION NOT NULL,
    "botId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuySellRepeatBotRunResult.botId_unique" ON "BuySellRepeatBotRunResult"("botId");

-- AddForeignKey
ALTER TABLE "BuySellRepeatBotRunResult" ADD FOREIGN KEY ("botId") REFERENCES "BuySellRepeatBot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
