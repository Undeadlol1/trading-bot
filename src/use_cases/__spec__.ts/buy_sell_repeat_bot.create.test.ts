import {
  BuySellRepeatBot,
  BuySellRepeatBotCreatePayload,
} from '../../entities/BuySellRepeatBot';
import { createBuySellRepeatBot } from '../buy_sell_repeat_bot.create';

const createPayload: BuySellRepeatBotCreatePayload = {
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
    await createBuySellRepeatBot(createPayload, {
      botRepo: { create: createFunctionMock, update: createFunctionMock },
    });
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });

  it('returns result of bot creation repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve(createPayload as BuySellRepeatBot)
    );
    const functionResult = await createBuySellRepeatBot(createPayload, {
      botRepo: { create: createFunctionMock, update: createFunctionMock },
    });
    expect(functionResult).toMatchObject(createPayload);
  });
});
