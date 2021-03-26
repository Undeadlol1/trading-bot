import { UsualDatabaseFields } from './UsualDatabaseFields';

// TODO: i do not like the fact that this interface is hidden in this file.
// TODO: i am also not sure about the name
export interface BuySellRepeatBotCreatePayload {
  buyAt: number;
  sellAt: number;
  isActive: boolean;
  symbolToBuy: string;
  symbolToBuyFor: string;
}

export interface BuySellRepeatBotUpdatePayload {
  buyAt?: number;
  sellAt?: number;
  hasSold?: boolean;
  isActive?: boolean;
  hasBought?: boolean;
  symbolToBuy?: string;
  symbolToBuyFor?: string;
}

export interface BuySellRepeatBot
  extends BuySellRepeatBotCreatePayload,
    UsualDatabaseFields {
  hasSold: boolean;
  hasBought: boolean;
}
