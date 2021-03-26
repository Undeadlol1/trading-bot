import {
  BuySellRepeatBot,
  BuySellRepeatBotCreatePayload,
} from '../../entities/BuySellRepeatBot';
import { updateBuySellRepeatBot } from '../buy_sell_repeat_bot.update';

const updatePayload: BuySellRepeatBotCreatePayload = {
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
    await updateBuySellRepeatBot({
      id: '123',
      data: updatePayload,
      dependencies: {
        botRepo: { create: createFunctionMock, update: createFunctionMock },
      },
    });
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });

  it('returns result of bot creation repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve(updatePayload as BuySellRepeatBot)
    );
    const functionResult = await updateBuySellRepeatBot({
      id: '123',
      data: updatePayload,
      dependencies: {
        botRepo: { create: createFunctionMock, update: createFunctionMock },
      },
    });
    expect(functionResult).toMatchObject(updatePayload);
  });
});