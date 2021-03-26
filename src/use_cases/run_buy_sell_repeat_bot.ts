import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

export async function runBuySellRepeatBot({
  bot,
  ticker,
}: // dependencies,
{
  bot: BuySellRepeatBot;
  ticker: CryptoCurrencyTicker;
  dependencies: {
    // updateBot: buyselbuySellRepeatBot;
  };
}): Promise<void> {
  if (!bot.isActive) {
    return Promise.resolve();
  }

  if (!bot.hasBought && ticker.close >= bot.buyAt) {
    // await dependencies.updateBot();
    // return dependencies.buyCrypto();
    return;
  }

  if (!bot.hasSold && ticker.close >= bot.sellAt) {
    // await dependencies.updateBot();
    // return dependencies.sellCrypto();
    return;
  }

  return Promise.resolve();
}
