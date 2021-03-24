import { Bot } from '../entities/Bot';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class BotRepository {
  async create(): Bot {
    // return PrismaClient.
  }
}
