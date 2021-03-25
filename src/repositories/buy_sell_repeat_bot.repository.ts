import { PrismaClient } from '@prisma/client';
import {
  BuySellRepeatBotPayload,
  BuySellRepeatBot,
} from '../entities/BuySellRepeatBot';

const prisma = new PrismaClient();

export class BuySellRepeatBotRepo {
  async create(data: BuySellRepeatBotPayload): Promise<BuySellRepeatBot> {
    return prisma.buySellRepeatBot.create({ data });
  }
}
