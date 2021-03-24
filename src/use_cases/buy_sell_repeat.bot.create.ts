import { Bot } from '../../dist/entities/Bot';
import { Strategy } from '../../dist/entities/Strategy';
import { BotRepository } from '../repositories/bot.repository';

interface Payload {
  // NOTE: do i need this?
  isActive: boolean;
  strategy: Strategy;
}

export function buySellRepeatBot(
  payload: Payload,
  dependencies: { botRepository: BotRepository }
): Bot {
  const bot = dependencies.botRepository.create(payload);
  return bot;
}
