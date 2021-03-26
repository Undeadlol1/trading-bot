import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';
import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';

export async function runBuySellRepeatBot({
  bot,
  ticker,
  dependencies,
}: {
  bot: BuySellRepeatBot;
  ticker: CryptoCurrencyTicker;
  dependencies: any;
}): Promise<void> {
  if (!bot.isActive) {
    return Promise.resolve();
  }

  if (!bot.hasBought && ticker.close >= bot.buyAt) {
    await dependencies.updateBot();
    return dependencies.buyCrypto();
  }

  if (!bot.hasSold && ticker.close >= bot.sellAt) {
    await dependencies.updateBot();
    return dependencies.sellCrypto();
  }
  return Promise.resolve();
}
