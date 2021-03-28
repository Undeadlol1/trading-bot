import { prisma } from '../../dbs/prisma/PrismaClientSignleton';
import { BuySellRepeatBotCreatePayload } from '../../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../buy_sell_repeat_bot.repository';

const repo = new BuySellRepeatBotRepo();
const createPayload: BuySellRepeatBotCreatePayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};

describe('Create BUY_SELL_REPEAT_BOT Repo', () => {
  afterAll(() => prisma.buySellRepeatBot.deleteMany());

  it('returns bot entity', async () => {
    const createdBot = await repo.create(createPayload);
    expect(createdBot).toMatchObject(createPayload);
  });

  it('should add default properties', async () => {
    const result = await repo.create(createPayload);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('hasSold', false);
    expect(result).toHaveProperty('hasBought', false);
  });
});
