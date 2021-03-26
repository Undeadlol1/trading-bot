import {
  BuySellRepeatBot,
  BuySellRepeatBotPayload,
} from '../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../repositories/buy_sell_repeat_bot.repository';

export async function updateBuySellRepeatBot({
  id,
  data,
  dependencies,
}: {
  id: string;
  data: BuySellRepeatBotPayload;
  dependencies: { botRepo: BuySellRepeatBotRepo };
}): Promise<BuySellRepeatBot> {
  return dependencies.botRepo.update({
    data,
    where: { id },
  });
}
