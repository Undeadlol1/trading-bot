import { Order, OrderCreatePayload } from '../../entities/Order';
import { createOrder } from '../order.create';

const orderPayload: OrderCreatePayload = {
  amount: 22,
  price: 123,
  side: 'BUY',
  botId: '123',
  type: 'MARKET',
  symbol: 'BTCUSDT',
};

const createFunction = jest.fn(() => Promise.resolve(orderPayload as Order));

const di = {
  orderRepo: {
    create: createFunction,
  },
};

describe('Create order', () => {
  it('calls order repository', async () => {
    await createOrder(orderPayload, di);
    expect(createFunction).toBeCalled();
  });

  it('returns order after creation', async (): Promise<void> => {
    const result = await createOrder(orderPayload, di);
    expect(result).toMatchObject(orderPayload);
  });
});
