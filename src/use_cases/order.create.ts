import { Order, OrderCreatePayload } from '../entities/Order';
import { OrderRepository } from '../repositories/order.create.repository';

export async function createOrder(
  payload: OrderCreatePayload,
  dependencies: { orderRepo: OrderRepository }
): Promise<Order> {
  return dependencies.orderRepo.create(payload);
}
