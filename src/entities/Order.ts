import { UsualDatabaseFields } from './UsualDatabaseFields';
import { BuySellRepeatBot } from './BuySellRepeatBot';

export interface OrderCreatePayload {
  price: number;
  amount: number;
  symbol: string;
  isFilled?: boolean;
  side: 'SELL' | 'BUY';
  bot: BuySellRepeatBot;
  type: 'LIMIT' | 'MARKET';
}

export interface OrderUpdatePayload {
  isFilled?: boolean;
}

export interface Order extends OrderCreatePayload, UsualDatabaseFields {
  botId: string;
  isFilled: boolean;
  bot: BuySellRepeatBot;
}
