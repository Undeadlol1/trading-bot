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

const createFunction = jest.fn(() =>
  Promise.resolve(botToCreate as BuySellRepeatBot)
);

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('calls bot repository', async () => {
    await createBuySellRepeatBot(botToCreate, {
      botRepo: { create: createFunction, update: createFunction },
    });

    expect(createFunction).toBeCalled();
  });

  it('returns bot after creation', async (): Promise<void> => {
    const di = {
      botRepo: {
        create: createFunction,
        update: createFunction,
      },
    };

    return createBuySellRepeatBot(botToCreate, di).then(result =>
      expect(result).toMatchObject(botToCreate)
    );
  });
});
