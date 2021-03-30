import { UsualDatabaseFields } from './UsualDatabaseFields';
import { BuySellRepeatBot } from './BuySellRepeatBot';

export interface LimitOrderCreatePayload {
  price: number;
  amount: number;
  symbol: string;
  isFilled?: boolean;
}

export interface LimitOrderUpdatePayload {
  isFilled?: boolean;
}

export interface LimitOrder
  extends LimitOrderCreatePayload,
    UsualDatabaseFields {
  botId: string;
  isFilled: boolean;
  bot: BuySellRepeatBot;
}
