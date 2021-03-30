-- CreateTable
CREATE TABLE "LimitOrder" (
    "price" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "symbol" TEXT NOT NULL,
    "isFilled" BOOLEAN NOT NULL DEFAULT false,
    "botId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LimitOrder.botId_unique" ON "LimitOrder"("botId");

-- AddForeignKey
ALTER TABLE "LimitOrder" ADD FOREIGN KEY ("botId") REFERENCES "BuySellRepeatBot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
