import { prisma } from '../../dbs/prisma/PrismaClientSignleton';
import {
  BuySellRepeatBot,
  BuySellRepeatBotCreatePayload,
} from '../../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../buy_sell_repeat_bot.repository';

let existingBot: BuySellRepeatBot;
const repo = new BuySellRepeatBotRepo();
const createPayload: BuySellRepeatBotCreatePayload = {
  buyAt: 10,
  sellAt: 11,
  isActive: true,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};
const updatePayload: BuySellRepeatBotCreatePayload = {
  buyAt: 12,
  sellAt: 14,
  isActive: false,
  symbolToBuy: 'BTC',
  symbolToBuyFor: 'USDT',
};

describe('Update BUY_SELL_REPEAT_BOT Repo', () => {
  beforeAll(async () => {
    existingBot = await prisma.buySellRepeatBot.create({
      data: createPayload,
    });
    return;
  });
  afterAll(() => prisma.buySellRepeatBot.deleteMany());

  it('returns updated bot', async () => {
    const updatedBot = await repo.update({
      data: updatePayload,
      where: { id: existingBot.id },
    });
    expect(updatedBot).toMatchObject(updatePayload);
  });

  it('updates fields in DB', async () => {
    await repo.update({
      where: { id: existingBot.id },
      data: updatePayload,
    });
    const botInDB = await findById(existingBot.id);
    expect(botInDB).toMatchObject(updatePayload);
  });
});

async function findById(id: string) {
  return prisma.buySellRepeatBot.findUnique({
    where: { id },
  });
}
