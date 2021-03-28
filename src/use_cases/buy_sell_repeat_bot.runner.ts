import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

interface Dependencies {
  buy: () => Promise<void>;
  sell: () => Promise<void>;
  updateBot: (args: {
    hasSold: boolean;
    hasBought: boolean;
  }) => Promise<BuySellRepeatBot>;
}

export class BuySellRepeatBotRunner {
  bot: BuySellRepeatBot;
  ticker: CryptoCurrencyTicker;
  dependencies: Dependencies;

  constructor({
    bot,
    ticker,
    dependencies,
  }: {
    bot: BuySellRepeatBot;
    ticker: CryptoCurrencyTicker;
    dependencies: Dependencies;
  }) {
    this.bot = bot;
    this.ticker = ticker;
    this.dependencies = dependencies;
  }

  async run(): Promise<void> {
    const { bot, ticker, dependencies } = this;
    if (!bot.isActive) {
      return;
    }

    if (!bot.hasBought && ticker.close <= bot.buyAt) {
      await this.dependencies.updateBot({
        hasSold: false,
        hasBought: true,
      });
      return this.dependencies.buy();
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
