import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';

export async function generateRandomBot(): Promise<BuySellRepeatBot> {
  const aBot: BuySellRepeatBot = {
    id: String(Math.floor(Math.random() * 100000)),
    amount: 2,
    buyAt: 100,
    sellAt: 110,
    isActive: true,
    hasSold: false,
    hasBought: false,
    symbol: 'BTCUSDT',
    currentBalance: 1000,
    initialBalance: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPaperTradingEnabled: false,
  };
  return aBot;
}
