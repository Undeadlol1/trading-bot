import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { BuySellRepeatBotRunner } from './buy_sell_repeat_bot.runner';

export async function prepareBotRunners(args: {
  bots: BuySellRepeatBot[];
  dependencies?: {};
}): Promise<BuySellRepeatBotRunner[]> {
  console.log('args: ', args);
  return [] as BuySellRepeatBotRunner[];
}
