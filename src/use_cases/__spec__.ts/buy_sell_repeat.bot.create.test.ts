import {
  BuySellRepeatBot,
  BuySellRepeatBotPayload,
} from '../../entities/BuySellRepeatBot';
import { buySellRepeatBot } from '../buy_sell_repeat.bot.create';
import { BuySellRepeatBotRepo } from '../../repositories/buy_sell_repeat_bot.repository';
import { prisma } from '../../dbs/prisma/PrismaClientSignleton';

const typicalPayload: BuySellRepeatBotPayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};

describe('Create BUY_SELL_REPEAT Bot', () => {
  afterAll(() => prisma.buySellRepeatBot.deleteMany());

  it('calls bot repository', async () => {
    const createFunctionMock = jest.fn(() =>
      Promise.resolve({} as BuySellRepeatBot)
    );
    await buySellRepeatBot(typicalPayload, {
      botRepo: { create: createFunctionMock },
    });
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });

  it('returns bot entity', async () => {
    const createdBot = await buySellRepeatBot(typicalPayload, {
      botRepo: new BuySellRepeatBotRepo(),
    });
    expect(createdBot.id).toBeTruthy();
    expect(createdBot).toMatchObject(typicalPayload);
  });
});
