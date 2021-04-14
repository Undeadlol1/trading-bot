import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';
import { Order, OrderCreatePayload } from '../entities/Order';

interface Dependencies {
  createOrder: (args: OrderCreatePayload) => Promise<Order>;
  updateBot: (args: {
    where: { id: string };
    data: {
      hasSold: boolean;
      hasBought: boolean;
      currentBalance?: number;
    };
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

    if (this._shouldBuy()) {
      return this._buyAndUpdateBot();
    }

    if (this._shouldSell()) {
      return this._sellAndUpdateBot();
    }
  }

  private async _sellAndUpdateBot() {
    await this._createOrder({ side: 'SELL' });
    await this._updateBot({
      hasSold: true,
      hasBought: false,
      currentBalance:
        // NOTE: I am not sure about this calculation.
        // NOTE: Will this break with alot of floating point numbers?
        // NOTE: JS is terrible at handling math.
        this.bot.initialBalance +
        (this.bot.sellAt - this.bot.buyAt) * this.bot.amount,
    });
  }

  private async _buyAndUpdateBot() {
    await this._createOrder({ side: 'BUY' });
    await this._updateBot({
      hasSold: false,
      hasBought: true,
    });
  }

  private _shouldSell() {
    return !this.bot.hasSold && this.ticker.close >= this.bot.sellAt;
  }

  private _shouldBuy() {
    return !this.bot.hasBought && this.ticker.close <= this.bot.buyAt;
  }

  private async _createOrder({ side }: { side: 'SELL' | 'BUY' }) {
    await this.dependencies.createOrder({
      side,
      price: null,
      type: 'MARKET',
      botId: this.bot.id,
      amount: this.bot.amount,
      symbol: this.bot.symbol,
    });
  }

  private async _updateBot(data: {
    hasSold: boolean;
    hasBought: boolean;
    currentBalance?: number;
  }) {
    await this.dependencies.updateBot({
      data,
      where: {
        id: this.bot.id,
      },
    });
  }
}
