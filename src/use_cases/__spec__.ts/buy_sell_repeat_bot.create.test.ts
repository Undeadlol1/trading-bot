import {
  BuySellRepeatBot,
  BuySellRepeatBotPayload,
} from '../../entities/BuySellRepeatBot';
import { buySellRepeatBot } from '../buy_sell_repeat_bot.create';

const createPayload: BuySellRepeatBotPayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('calls bot repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );
    await buySellRepeatBot(createPayload, {
      botRepo: { create: createFunctionMock },
    });
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });

  it('returns result of bot creation repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve(createPayload as BuySellRepeatBot)
    );
    const functionResult = await buySellRepeatBot(createPayload, {
      botRepo: { create: createFunctionMock },
    });
    expect(functionResult).toMatchObject(createPayload);
  });
});
