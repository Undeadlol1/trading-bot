import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

interface Dependencies {
  buy: () => Promise<void>;
  sell: () => Promise<void>;
  updateBot: (args: {
    hasSold: boolean;
    hasBought: boolean;
    currentBalance?: number;
  }) => Promise<BuySellRepeatBot>;
}

export class BuySellRepeatBotRunner {
  private bot: BuySellRepeatBot;
  private dependencies: Dependencies;
  private ticker: CryptoCurrencyTicker;

  constructor(args: {
    bot: BuySellRepeatBot;
    dependencies: Dependencies;
    ticker: CryptoCurrencyTicker;
  }) {
    this.bot = args.bot;
    this.ticker = args.ticker;
    this.dependencies = args.dependencies;
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
      currentBalance:
        // NOTE: I am not sure about this calculation.
        // NOTE: Will this break with alot of floating point numbers?
        // NOTE: JS is terrible at handling math.
        this.bot.initialBalance +
        (this.bot.sellAt - this.bot.buyAt) * this.bot.amountToBuy,
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
