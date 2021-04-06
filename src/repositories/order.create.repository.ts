import { prisma } from '../dbs/prisma/PrismaClientSignleton';
import { Order, OrderCreatePayload } from '../entities/Order';

export class OrderRepository {
  async create(data: OrderCreatePayload): Promise<Order> {
    const result = prisma.order.create({ data });
    return result;
  }
}
