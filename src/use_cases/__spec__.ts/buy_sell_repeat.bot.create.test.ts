import { Bot } from '../../../dist/entities/Bot';
import { Strategy } from '../../../dist/entities/Strategy';
import { buySellRepeatBot } from '../buy_sell_repeat.bot.create';
import { StrategyCodeName } from '../../entities/StrategyCodeName';

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('returns Bot entity', async () => {
    const botStrategy: Strategy = {
      payload: {},
      name: StrategyCodeName.buySellRepeat,
    };
    const createdBot = await buySellRepeatBot(
      {
        isActive: true,
        strategy: botStrategy,
      },
      { botRepository: { create: () => Promise.resolve({} as Bot) } }
    );
    expect(createdBot.strategy).toEqual(botStrategy);
  });
});
