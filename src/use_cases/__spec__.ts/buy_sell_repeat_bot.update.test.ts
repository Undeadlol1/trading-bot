import {
  BuySellRepeatBot,
  BuySellRepeatBotPayload,
} from '../../entities/BuySellRepeatBot';
import { buySellRepeatBot } from '../buy_sell_repeat_bot.create';

const updatePayload: BuySellRepeatBotPayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};

describe('Update BUY_SELL_REPEAT Bot', () => {
  it('calls bot repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );
    await buySellRepeatBot(updatePayload, {
      botRepo: { create: createFunctionMock },
    });
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });

  it('returns result of bot creation repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve(updatePayload as BuySellRepeatBot)
    );
    const functionResult = await buySellRepeatBot(updatePayload, {
      botRepo: { create: createFunctionMock },
    });
    expect(functionResult).toMatchObject(updatePayload);
  });
});
