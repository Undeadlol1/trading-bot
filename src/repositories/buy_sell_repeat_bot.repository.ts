import { prisma } from '../dbs/prisma/PrismaClientSignleton';
import {
  BuySellRepeatBotPayload,
  BuySellRepeatBot,
} from '../entities/BuySellRepeatBot';

export class BuySellRepeatBotRepo {
  async create(data: BuySellRepeatBotPayload): Promise<BuySellRepeatBot> {
    return prisma.buySellRepeatBot.create({ data });
  }
}
