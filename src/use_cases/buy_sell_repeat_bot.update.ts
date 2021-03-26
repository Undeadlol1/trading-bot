import {
  BuySellRepeatBot,
  BuySellRepeatBotUpdatePayload,
} from '../entities/BuySellRepeatBot';
import { BuySellRepeatBotRepo } from '../repositories/buy_sell_repeat_bot.repository';

export interface updateBuySellRepeatBotArguments {
  id: string;
  data: BuySellRepeatBotUpdatePayload;
  dependencies: {
    botRepo: BuySellRepeatBotRepo;
  };
}

export async function updateBuySellRepeatBot({
  id,
  data,
  dependencies,
}: updateBuySellRepeatBotArguments): Promise<BuySellRepeatBot> {
  return dependencies.botRepo.update({
    data,
    where: { id },
  });
}
