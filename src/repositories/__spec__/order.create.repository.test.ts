import { prisma } from '../../dbs/prisma/PrismaClientSignleton';
import { BuySellRepeatBot } from '../../entities/BuySellRepeatBot';
import { OrderCreatePayload } from '../../entities/Order';
import { OrderRepository } from '../order.create.repository';

const repo = new OrderRepository();
const createPayload: OrderCreatePayload = {
  price: 22,
  amount: 22,
  side: 'SELL',
  type: 'MARKET',
  symbol: 'BTCETH',
  bot: {} as BuySellRepeatBot,
};

describe('Create BUY_SELL_REPEAT_BOT Repo', () => {
  afterAll(() => prisma.order.deleteMany());

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
    expect(result).toHaveProperty('type', createPayload.type);
    expect(result).toHaveProperty('hasBought', createPayload.side);
  });
});
