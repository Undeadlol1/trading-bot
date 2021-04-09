import { UsualDatabaseFields } from './UsualDatabaseFields';

// TODO: i do not like the fact that this interface is hidden in this file.
// TODO: i am also not sure about the name
export interface BuySellRepeatBotCreatePayload {
  buyAt: number;
  sellAt: number;
  amount: number;
  symbol: string;
  isActive: boolean;
  initialBalance: number;
  currentBalance: number;
  isPaperTradingEnabled: boolean;
}

export interface BuySellRepeatBotUpdatePayload {
  buyAt?: number;
  sellAt?: number;
  symbol?: string;
  amount?: number;
  hasSold?: boolean;
  isActive?: boolean;
  hasBought?: boolean;
  currentBalance?: number;
  isPaperTradingEnabled?: boolean;
}

export interface BuySellRepeatBot
  extends BuySellRepeatBotCreatePayload,
    UsualDatabaseFields {
  hasSold: boolean;
  hasBought: boolean;
}
