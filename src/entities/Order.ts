import { BuySellRepeatBot } from './BuySellRepeatBot';
import { UsualDatabaseFields } from './UsualDatabaseFields';

export interface OrderCreatePayload {
  id?: string;
  botId: string;
  amount: number;
  symbol: string;
  isFilled?: boolean;
  side: 'SELL' | 'BUY';
  price: number | null;
  type: 'LIMIT' | 'MARKET';
}

export interface Order extends UsualDatabaseFields {
  botId: string;
  amount: number;
  symbol: string;
  isFilled: boolean;
  side: 'SELL' | 'BUY';
  price: number | null;
  bot?: BuySellRepeatBot;
  type: 'LIMIT' | 'MARKET';
}
