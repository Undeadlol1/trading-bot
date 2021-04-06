import { prisma } from '../../dbs/prisma/PrismaClientSignleton';
import { BuySellRepeatBotCreatePayload } from '../../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../buy_sell_repeat_bot.repository';

const repo = new BuySellRepeatBotRepo();
const createPayload: BuySellRepeatBotCreatePayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  amountToBuy: 1,
  symbolToBuy: 'BTC',
  initialBalance: 1000,
  currentBalance: 1000,
  symbolToBuyFor: 'USDT',
  isPaperTradingEnabled: false,
};

describe('Create BUY_SELL_REPEAT_BOT Repo', () => {
  afterAll(() => prisma.buySellRepeatBot.deleteMany());

  it('returns bot entity', async () => {
    const createdBot = await repo.create(createPayload);
    expect(createdBot).toMatchObject(createPayload);
  });

  it('should add default properties', async () => {
    const createdBot = await repo.create(createPayload);
    expect(createdBot).toHaveProperty('id');
    expect(createdBot).toHaveProperty('createdAt');
    expect(createdBot).toHaveProperty('updatedAt');
    expect(createdBot).toHaveProperty('hasSold', false);
    expect(createdBot).toHaveProperty('hasBought', false);
  });
});
