import { BuySellRepeatBot } from './BuySellRepeatBot';
import { UsualDatabaseFields } from './UsualDatabaseFields';

export interface OrderCreatePayload {
  id?: string;
  botId: string;
  price?: number;
  amount: number;
  symbol: string;
  isFilled?: boolean;
  side: 'SELL' | 'BUY';
  type: 'LIMIT' | 'MARKET';
}

export interface Order extends UsualDatabaseFields {
  botId: string;
  price?: number;
  amount: number;
  symbol: string;
  isFilled: boolean;
  side: 'SELL' | 'BUY';
  bot?: BuySellRepeatBot;
  type: 'LIMIT' | 'MARKET';
}
