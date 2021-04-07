import { Order, OrderCreatePayload } from '../entities/Order';
import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

interface Dependencies {
  createOrder: (args: OrderCreatePayload) => Promise<Order>;
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
    await this.dependencies.createOrder({
      side: 'SELL',
      type: 'MARKET',
      botId: this.bot.id,
      amount: this.bot.amountToBuy,
      symbol: this.bot.symbolToBuy + this.bot.symbolToBuyFor,
    });
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
  }

  private async buyAndUpdateBot() {
    await this.dependencies.createOrder({
      side: 'BUY',
      type: 'MARKET',
      botId: this.bot.id,
      amount: this.bot.amountToBuy,
      symbol: this.bot.symbolToBuy + this.bot.symbolToBuyFor,
    });
    await this.dependencies.updateBot({
      hasSold: false,
      hasBought: true,
    });
  }

  private shouldSell() {
    return !this.bot.hasSold && this.ticker.close >= this.bot.sellAt;
  }

  private shouldBuy() {
    return !this.bot.hasBought && this.ticker.close <= this.bot.buyAt;
  }
}
