
export interface TrailingOrderBotCreateDTO {
  symbol: string;
  amount: number;
  isActive: boolean;
  // TODO: rename this to something more suitable.
  minimumBuyAt: boolean;
  minimumSellAt: boolean;
  initialBalance: number;
  currentBalance: number;
  isPaperTradingEnabled: boolean;
}
