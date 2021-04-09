import { BuySellRepeatBotRunner } from './buy_sell_repeat_bot.runner';
import { OrderRepository } from '../repositories/order.create.repository';
import { BuySellRepeatBotRepo } from '../repositories/buy_sell_repeat_bot.repository';
import { GetMultipleCryptoTickers } from '../repositories/get_multiple_crypto_tickers';
import { BuySellRepeatBot } from '../entities/BuySellRepeatBot';

export async function getAndRunBots({
  di,
}: {
  di: {
    botRepo: BuySellRepeatBotRepo;
    createOrder: OrderRepository;
    getTickers: GetMultipleCryptoTickers;
  };
}): Promise<void> {
  const bots = await di.botRepo.findMany({ where: { isActive: true } });
  const tickers = await di.getTickers.run({ symbols: bots.map(i => i.symbol) });
  const botRunners: (BuySellRepeatBotRunner | undefined)[] = bots.map(function(
    bot: BuySellRepeatBot
  ): BuySellRepeatBotRunner | undefined {
    const ticker = tickers?.find(ticker => ticker.symbol === bot.symbol);
    if (ticker) {
      return new BuySellRepeatBotRunner({
        bot,
        ticker,
        dependencies: {
          updateBot: di.botRepo.update,
          createOrder: di.createOrder.create,
        },
      });
    } else {
      return;
    }
  });

  await Promise.all(botRunners.map(runner => runner?.run()));
}
