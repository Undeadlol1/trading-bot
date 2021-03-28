import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { BuySellRepeatBotRunner } from '../run_buy_sell_repeat_bot';
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

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies,
    });

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

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies,
    });

    expect(dependencies.buy).toHaveBeenCalled();
    expect(dependencies.sell).not.toHaveBeenCalled();
  });

  it('updates bot after buy', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.buyAt = 100;
    bot.sellAt = 110;
    ticker.close = 99;

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies,
    });

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

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies,
    });

    expect(dependencies.updateBot).toBeCalledTimes(1);
    expect(dependencies.updateBot).toBeCalledWith({
      hasSold: true,
      hasBought: false,
    });
  });

  it('does nothing if bot is paused', async () => {
    const bot = getBot();
    const dependencies = getDependencies();
    bot.isActive = false;

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies,
    });

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
    hasBought: false,
    symbolToBuy: 'BTC',
    symbolToBuyFor: 'USDT',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function getDependencies() {
  return {
    buy: jest.fn(() => Promise.resolve()),
    sell: jest.fn(() => Promise.resolve()),
    updateBot: jest.fn(() => Promise.resolve({} as BuySellRepeatBot)),
  };
}
