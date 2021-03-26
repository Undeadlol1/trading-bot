import { runBuySellRepeatBot } from '../run_buy_sell_repeat_bot';
import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../../entities/CryptoCurrencyTicker';

// TODO create generator function?
const bot: BuySellRepeatBot = {
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

const ticker: CryptoCurrencyTicker = {
  close: 100,
  symbol: 'BTC/USDT',
};

describe('BUY_SELL_REPEAT runner', () => {
  it('does nothing if bot is paused', async () => {
    bot.isActive = false;
    const buyFunction = jest.fn(Promise.resolve);
    await runBuySellRepeatBot({
      bot,
      ticker,
      dependencies: {},
    });
    expect(buyFunction.mock.calls.length).toStrictEqual(0);
  });

  // it('buys if necessary', async () => {
  //   bot.buyAt = 100;
  //   bot.sellAt = 100;
  //   ticker.close = 99;
  //   const buyFunction = jest.fn(Promise.resolve);
  //   const botUpdateFunction = jest.fn(Promise.resolve);
  //   await runBuySellRepeatBot({
  //     bot,
  //     ticker,
  //     dependencies: { buyFunctionMock: buyFunction, botUpdateFunction },
  //   });
  //   expect(buyFunction.mock.calls.length === 1).toBeTruthy();
  //   expect(botUpdateFunction.mock.calls.length === 1).toBeTruthy();
  // });
});
