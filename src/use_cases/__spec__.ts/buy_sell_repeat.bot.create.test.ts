import { Strategy } from '../../../dist/entities/Strategy';
import { StrategyCodeName } from '../../entities/StrategyCodeName';
import { buySellRepeatBot } from '../buy_sell_repeat.bot.create';

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('returns Bot entity', async () => {
    const botStrategy: Strategy = {
      payload: {},
      name: StrategyCodeName.buySellRepeat,
    };
    const createdBot = await buySellRepeatBot({
      isActive: true,
      strategy: botStrategy,
    });
    expect(createdBot.strategy).toEqual(botStrategy);
  });
});
