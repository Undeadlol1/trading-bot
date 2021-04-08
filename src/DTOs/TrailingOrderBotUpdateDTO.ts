
export interface TrailingOrderBotUpdateDTO {
  amount: number;
  symbol?: string;
  hasSold?: boolean;
  isActive?: boolean;
  hasBought?: boolean;
  minimumBuyAt?: boolean;
  minimumSellAt?: boolean;
  currentBalance?: number;
  isPaperTradingEnabled?: boolean;
}
