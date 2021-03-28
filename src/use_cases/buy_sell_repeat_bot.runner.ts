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
    if (!this.bot.isActive) {
      return;
    }

    if (this.shouldBuy()) {
      return this.buyAndUpdateBot();
    }

    if (this.shouldSell()) {
      return this.sellAndUpdateBot();
    }
  }

  private async sellAndUpdateBot() {
    await this.dependencies.updateBot({
      hasSold: true,
      hasBought: false,
    });
    return this.dependencies.sell();
  }

  private async buyAndUpdateBot() {
    await this.dependencies.updateBot({
      hasSold: false,
      hasBought: true,
    });
    return this.dependencies.buy();
  }

  private shouldSell() {
    return !this.bot.hasSold && this.ticker.close >= this.bot.sellAt;
  }

  private shouldBuy() {
    return !this.bot.hasBought && this.ticker.close <= this.bot.buyAt;
  }
}
