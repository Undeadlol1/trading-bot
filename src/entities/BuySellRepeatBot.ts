import { UsualDatabaseFields } from './UsualDatabaseFields';

// TODO: i do not like the fact that this interface is hidden in this file.
// TODO: i am also not sure about the name
export interface BuySellRepeatBotPayload {
  buyAt: number;
  sellAt: number;
  isActive: boolean;
  symbolToBuy: string;
  symbolToBuyFor: string;
}

export interface BuySellRepeatBot
  extends BuySellRepeatBotPayload,
    UsualDatabaseFields {}
