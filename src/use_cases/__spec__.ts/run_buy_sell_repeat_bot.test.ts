import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../../entities/CryptoCurrencyTicker';
import { BuySellRepeatBotRunner } from '../run_buy_sell_repeat_bot';

const ticker: CryptoCurrencyTicker = {
  close: 100,
  symbol: 'BTC/USDT',
};

describe('BUY_SELL_REPEAT runner', () => {
  it('updates bot properties after buy', async () => {
    const bot = generateBot();
    bot.buyAt = 100;
    bot.sellAt = 110;
    ticker.close = 99;
    const botUpdateFunction = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies: { updateBot: botUpdateFunction },
    });

    expect(botUpdateFunction.mock.calls.length === 1).toBeTruthy();
    expect((botUpdateFunction.mock.calls[0] as any)[0]).toEqual({
      hasSold: false,
      hasBought: true,
    });
  });

  it('updates bot properties after sell', async () => {
    const bot = generateBot();
    bot.buyAt = 100;
    bot.sellAt = 110;
    ticker.close = 115;
    bot.hasBought = true;
    const botUpdateFunction = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );

    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies: { updateBot: botUpdateFunction },
    });

    expect(botUpdateFunction.mock.calls.length === 1).toBeTruthy();
    expect((botUpdateFunction.mock.calls[0] as any)[0]).toEqual({
      hasSold: true,
      hasBought: false,
    });
  });

  it('does nothing if bot is paused', async () => {
    const bot = generateBot();
    bot.isActive = false;
    const buyFunction = jest.fn(Promise.resolve);
    await BuySellRepeatBotRunner.run({
      bot,
      ticker,
      dependencies: { updateBot: async () => ({} as BuySellRepeatBot) },
    });
    expect(buyFunction.mock.calls.length).toStrictEqual(0);
  });
});

function generateBot(): BuySellRepeatBot {
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
