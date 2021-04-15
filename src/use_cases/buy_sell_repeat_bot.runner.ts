// TODO add "Math" or "SafeMath" class and use it in DI.
import { chain as chainMathExpressions } from 'mathjs';
import { Order, OrderCreatePayload } from '../entities/Order';
import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

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

    if (!this.bot.hasSold && this.ticker.close <= this.bot.sellAt) {
      return this._buyAndUpdateBot();
    }

    if (!this.bot.hasSold && this.ticker.close >= this.bot.sellAt) {
      return this._sellAndUpdateBot();
    }
  }

  private async _sellAndUpdateBot() {
    await this._createOrder({ side: 'SELL' });
    await this._updateBot({
      hasSold: true,
      hasBought: false,
      currentBalance: chainMathExpressions(this.bot.sellAt)
        .subtract(this.bot.buyAt)
        .multiply(this.bot.amount)
        .add(this.bot.initialBalance)
        .done(),
    });
  }

  private async _buyAndUpdateBot() {
    await this._createOrder({ side: 'BUY' });
    await this._updateBot({
      hasSold: false,
      hasBought: true,
    });
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
