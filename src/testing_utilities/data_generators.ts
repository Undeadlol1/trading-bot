import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';

export async function generateRandomBot(): Promise<BuySellRepeatBot> {
  const aBot: BuySellRepeatBot = {
    id: String(Math.floor(Math.random() * 100000)),
    buyAt: 100,
    sellAt: 110,
    isActive: true,
    hasSold: false,
    amount: 2,
    hasBought: false,
    symbolToBuy: 'BTC',
    currentBalance: 1000,
    initialBalance: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    symbolToBuyFor: 'USDT',
    isPaperTradingEnabled: false,
  };
  return aBot;
}
