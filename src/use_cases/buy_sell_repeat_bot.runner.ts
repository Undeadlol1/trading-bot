import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

export class BuySellRepeatBotRunner {
  static async run({
    bot,
    ticker,
    dependencies,
  }: {
    bot: BuySellRepeatBot;
    ticker: CryptoCurrencyTicker;
    dependencies: {
      buy: () => Promise<void>;
      sell: () => Promise<void>;
      updateBot: (args: {
        hasSold: boolean;
        hasBought: boolean;
      }) => Promise<BuySellRepeatBot>;
    };
  }): Promise<void> {
    if (!bot.isActive) {
      return;
    }

    if (!bot.hasBought && ticker.close <= bot.buyAt) {
      await dependencies.updateBot({
        hasSold: false,
        hasBought: true,
      });
      return dependencies.buy();
    }

    if (!bot.hasSold && ticker.close >= bot.sellAt) {
      await dependencies.updateBot({
        hasSold: true,
        hasBought: false,
      });
      return dependencies.sell();
    }
  }
}
