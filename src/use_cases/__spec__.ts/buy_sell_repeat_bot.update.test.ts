import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { updateBuySellRepeatBot } from '../buy_sell_repeat_bot.update';
import { BuySellRepeatBotUpdatePayload } from '../../entities/BuySellRepeatBot';

const updatePayload: BuySellRepeatBotUpdatePayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbol: 'BTCUSDT',
};

const findManyFunction = jest.fn(() =>
  Promise.resolve([] as BuySellRepeatBot[])
);

describe('Update BUY_SELL_REPEAT Bot', () => {
  it('calls bot repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );
    await updateBuySellRepeatBot({
      id: '123',
      data: updatePayload,
      dependencies: {
        botRepo: {
          create: createFunctionMock,
          update: createFunctionMock,
          findMany: findManyFunction,
        },
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
        botRepo: {
          create: createFunctionMock,
          update: createFunctionMock,
          findMany: findManyFunction,
        },
      },
    });
    expect(functionResult).toMatchObject(updatePayload);
  });
});
