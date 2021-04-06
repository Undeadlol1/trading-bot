import {
  BuySellRepeatBot,
  BuySellRepeatBotCreatePayload,
} from '../../entities/BuySellRepeatBot';
import { createBuySellRepeatBot } from '../buy_sell_repeat_bot.create';

const botToCreate: BuySellRepeatBotCreatePayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  amountToBuy: 10,
  symbolToBuy: 'BTC',
  initialBalance: 1000,
  currentBalance: 1000,
  symbolToBuyFor: 'USDT',
  isPaperTradingEnabled: true,
};

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('calls bot repository', async () => {
    const createFunction = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );

    await createBuySellRepeatBot(botToCreate, {
      botRepo: { create: createFunction, update: createFunction },
    });

    expect(createFunction).toBeCalled();
  });

  it('returns result of bot creation repository', async (): Promise<void> => {
    const di = {
      botRepo: {
        create: () => Promise.resolve(botToCreate as BuySellRepeatBot),
        update: () => Promise.resolve(botToCreate as BuySellRepeatBot),
      },
    };

    return createBuySellRepeatBot(botToCreate, di).then(result =>
      expect(result).toMatchObject(botToCreate)
    );
  });
});
