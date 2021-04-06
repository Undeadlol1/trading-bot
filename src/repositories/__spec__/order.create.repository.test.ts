import { prisma } from '../../dbs/prisma/PrismaClientSignleton';
import { BuySellRepeatBotCreatePayload } from '../../entities/BuySellRepeatBot';
import { OrderCreatePayload } from '../../entities/Order';
import { BuySellRepeatBotRepo } from '../buy_sell_repeat_bot.repository';
import { OrderRepository } from '../order.create.repository';

const repo = new OrderRepository();

const createPayload: OrderCreatePayload = {
  price: 22,
  botId: '',
  amount: 22,
  side: 'SELL',
  type: 'MARKET',
  symbol: 'BTCETH',
};

describe('Create BUY_SELL_REPEAT_BOT Repo', () => {
  beforeAll(async () => {
    // TODO: extract bot creating logic.
    const botPayload: BuySellRepeatBotCreatePayload = {
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
    const botRepo = new BuySellRepeatBotRepo();
    return botRepo
      .create(botPayload)
      .then(bot => (createPayload.botId = bot.id));
  });

  afterAll(() =>
    Promise.all([
      prisma.order.deleteMany(),
      prisma.buySellRepeatBot.delete({ where: { id: createPayload.botId } }),
    ])
  );

  it('actually inserts doc into DB', async () => {
    const documentsBefore = await prisma.order.count();
    expect(documentsBefore).toBeLessThanOrEqual(0);

    await repo.create(createPayload);
    const documentsAfter = await prisma.order.count();
    expect(documentsAfter).toStrictEqual(1);
  });

  it('returns limit order', async () => {
    const createdBot = await repo.create(createPayload);
    expect(createdBot).toMatchObject(createPayload);
  });

  it('should add default properties', async () => {
    const result = await repo.create(createPayload);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('assignes values properly', async () => {
    const result = await repo.create(createPayload);
    expect(result).toHaveProperty('side', 'SELL');
    expect(result).toHaveProperty('type', 'MARKET');
  });
});
