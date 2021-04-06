import { UsualDatabaseFields } from './UsualDatabaseFields';
import { BuySellRepeatBot } from './BuySellRepeatBot';

export interface OrderCreatePayload {
  id?: string;
  price: number;
  botId: string;
  amount: number;
  symbol: string;
  isFilled?: boolean;
  side: 'SELL' | 'BUY';
  type: 'LIMIT' | 'MARKET';
}

export interface OrderUpdatePayload {
  isFilled?: boolean;
}

export interface Order extends UsualDatabaseFields {
  price: number;
  botId: string;
  amount: number;
  symbol: string;
  isFilled: boolean;
  side: 'SELL' | 'BUY';
  bot?: BuySellRepeatBot;
  type: 'LIMIT' | 'MARKET';
}
