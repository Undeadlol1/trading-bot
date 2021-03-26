import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';
import { updateBuySellRepeatBotArguments } from './buy_sell_repeat_bot.update';

export async function runBuySellRepeatBot({
  bot,
  ticker,
}: // dependencies,
{
  bot: BuySellRepeatBot;
  ticker: CryptoCurrencyTicker;
  dependencies: {
    updateBot: (
      args: updateBuySellRepeatBotArguments
    ) => Promise<BuySellRepeatBot>;
  };
}): Promise<void> {
  if (!bot.isActive) {
    return Promise.resolve();
  }

  if (!bot.hasBought && ticker.close >= bot.buyAt) {
    // await dependencies.updateBot({
    //   id: bot.id,
    //   // data: {
    //   //   hasBought: false,
    //   //   hasSold: true,
    //   // },
    // });
    // return dependencies.buyCrypto();
    return;
  }

  // if (!bot.hasSold && ticker.close >= bot.sellAt) {
  //   await dependencies.updateBot();
  //   // return dependencies.sellCrypto();
  //   return;
  // }

  return Promise.resolve();
}
