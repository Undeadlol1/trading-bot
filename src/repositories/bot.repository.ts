import { Bot } from '../entities/Bot';
import { PrismaClient } from '@prisma/client';
import { Strategy } from '../../dist/entities/Strategy';

const prisma = new PrismaClient();

export class BotRepository {
  async create(bot: { strategy: Strategy; name: String }): Promise<Bot> {
    return prisma.bot.create({ data: bot, });
  }
}
