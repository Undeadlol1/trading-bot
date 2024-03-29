import {
  BuySellRepeatBot,
  BuySellRepeatBotCreatePayload,
} from '../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../repositories/buy_sell_repeat_bot.repository';

export async function createBuySellRepeatBot(
  payload: BuySellRepeatBotCreatePayload,
  dependencies: { botRepo: BuySellRepeatBotRepo }
): Promise<BuySellRepeatBot> {
  return dependencies.botRepo.create(payload);
}
