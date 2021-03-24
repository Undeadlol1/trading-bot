import { Bot } from '../entities/Bot';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BotRepository {
  async create(): Promise<Bot> {
    return prisma.bot.create();
  }
}
