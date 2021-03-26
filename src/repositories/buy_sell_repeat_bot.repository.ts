import { prisma } from '../dbs/prisma/PrismaClientSignleton';
import {
  BuySellRepeatBotCreatePayload,
  BuySellRepeatBot,
} from '../entities/BuySellRepeatBot';

export class BuySellRepeatBotRepo {
  async create(data: BuySellRepeatBotCreatePayload): Promise<BuySellRepeatBot> {
    return prisma.buySellRepeatBot.create({ data });
  }

  async update(args: {
    where: { id: string };
    data: {
      hasSold?: boolean;
      isActive?: boolean;
      hasBought?: boolean;
    };
  }): Promise<BuySellRepeatBot> {
    return prisma.buySellRepeatBot.update(args);
  }
}
