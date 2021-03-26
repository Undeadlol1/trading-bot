import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';
import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';

export function runBuySellRepeatBot({
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
  ticker.close;
  dependencies;
  // console.log('bot: ', bot);
  // console.log('ticker', ticker);
  // console.log('dependencies', dependencies);
  return Promise.resolve();
}
