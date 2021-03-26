import { runBuySellRepeatBot } from '../run_buy_sell_repeat_bot';
import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../../entities/CryptoCurrencyTicker';

// TODO create generator function?
const bot: BuySellRepeatBot = {
  id: '123',
  buyAt: 100,
  sellAt: 110,
  isActive: true,
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
  test('resolves', async () => {
    const result = await runBuySellRepeatBot({
      bot,
      ticker,
      dependencies: {},
    });
    expect(result).resolves;
  });
});
