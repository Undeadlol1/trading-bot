import { Bot } from '../../../dist/entities/Bot';
import { Strategy } from '../../../dist/entities/Strategy';
import { buySellRepeatBot } from '../buy_sell_repeat.bot.create';
import { StrategyCodeName } from '../../entities/StrategyCodeName';

const botStrategy: Strategy = {
  payload: {},
  name: StrategyCodeName.buySellRepeat,
};

describe('Create BUY_SELL_REPEAT Bot', () => {
  it('returns Bot entity', async () => {
    const createdBot = await buySellRepeatBot(
      {
        isActive: true,
        strategy: botStrategy,
      },
      { botRepository: { create: () => Promise.resolve({} as Bot) } }
    );
    expect(createdBot.strategy).toEqual(botStrategy);
  });

  it('calls bot repository', async () => {
    const createFunctionMock = jest.fn(() => Promise.resolve({} as Bot));
    await buySellRepeatBot(
      {
        isActive: true,
        strategy: botStrategy,
      },
      { botRepository: { create: createFunctionMock } }
    );
    expect(createFunctionMock.mock.calls.length === 1).toBeTruthy();
  });
});
