import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { BuySellRepeatBotRunner } from '../buy_sell_repeat_bot.runner';
import { CryptoCurrencyTicker } from '../../entities/CryptoCurrencyTicker';

const ticker: CryptoCurrencyTicker = {
  close: 100,
  symbol: 'BTC/USDT',
};

describe('BUY_SELL_REPEAT runner', () => {
  it('calls sell function', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.buyAt = 100;
    bot.sellAt = 110;
    bot.hasSold = false;
    bot.hasBought = true;
    ticker.close = 115;

    const runner = new BuySellRepeatBotRunner({
      bot,
      ticker,
      dependencies,
    });
    await runner.run();

    expect(dependencies.sell).toHaveBeenCalled();
    expect(dependencies.buy).not.toHaveBeenCalled();
  });

  it('calls buy function', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.buyAt = 100;
    bot.sellAt = 110;
    bot.hasSold = false;
    bot.hasBought = false;
    ticker.close = 90;

    const runner = new BuySellRepeatBotRunner({
      bot,
      ticker,
      dependencies,
    });
    await runner.run();

    expect(dependencies.buy).toHaveBeenCalled();
    expect(dependencies.sell).not.toHaveBeenCalled();
  });

  it('updates bot after buy', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.buyAt = 100;
    bot.sellAt = 110;
    bot.initialBalance = 1000;
    bot.currentBalance = 1000;
    ticker.close = 100;

    const runner = new BuySellRepeatBotRunner({
      bot,
      ticker,
      dependencies,
    });
    await runner.run();

    expect(dependencies.updateBot).toHaveBeenCalledWith({
      hasSold: false,
      hasBought: true,
    });
  });

  it('updates bot after sell', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.buyAt = 100;
    bot.sellAt = 110;
    ticker.close = 115;
    bot.hasBought = true;

    const runner = new BuySellRepeatBotRunner({
      bot,
      ticker,
      dependencies,
    });
    await runner.run();

    expect(dependencies.updateBot).toBeCalledTimes(1);
    expect(dependencies.updateBot).toBeCalledWith({
      hasSold: true,
      hasBought: false,
      currentBalance: 1010,
    });
  });

  it('does nothing if bot is paused', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.isActive = false;

    const runner = new BuySellRepeatBotRunner({
      bot,
      ticker,
      dependencies,
    });
    await runner.run();

    expect(dependencies.buy).not.toHaveBeenCalled();
    expect(dependencies.sell).not.toHaveBeenCalled();
    expect(dependencies.updateBot).not.toHaveBeenCalled();
  });
});

function getBot(): BuySellRepeatBot {
  return {
    id: '123',
    buyAt: 100,
    sellAt: 110,
    isActive: true,
    hasSold: false,
    amountToBuy: 10,
    hasBought: false,
    symbolToBuy: 'BTC',
    currentBalance: 1000,
    initialBalance: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    symbolToBuyFor: 'USDT',
    isPaperTradingEnabled: false,
  };
}

function getDependencies() {
  return {
    buy: jest.fn(() => Promise.resolve()),
    sell: jest.fn(() => Promise.resolve()),
    updateBot: jest.fn(() => Promise.resolve({} as BuySellRepeatBot)),
  };
}
