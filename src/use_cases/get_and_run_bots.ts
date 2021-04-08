import { BuySellRepeatBotRepo } from '../repositories/buy_sell_repeat_bot.repository';
import { BuySellRepeatBotRunner } from './buy_sell_repeat_bot.runner';
import { OrderRepository } from '../repositories/order.create.repository';

export async function getAndRunBots({
  di,
}: {
  di: { botRepo: BuySellRepeatBotRepo; createOrder: OrderRepository };
}): Promise<void> {
  const bots = await di.botRepo.findMany({ where: { isActive: true } });
  //   const tickers = await
  const botRunners: BuySellRepeatBotRunner[] = bots.map(bot => {
    const runner = new BuySellRepeatBotRunner({
      bot,
      // TODO fetch tickers
      ticker: {
        close: 10,
        symbol: bot.symbolToBuy,
      },
      dependencies: {
        updateBot: di.botRepo,
        createOrder: di.createOrder.create,
      },
    });
    return runner;
  });

  await Promise.all(botRunners.map(runner => runner.run()));
}
