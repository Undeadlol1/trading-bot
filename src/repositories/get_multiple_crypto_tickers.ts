import ccxt from 'ccxt';
import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';

export class GetMultipleCryptoTickers {
  async run({
    symbols,
  }: {
    symbols: string[];
  }): Promise<CryptoCurrencyTicker[]> {
    const exchange = new ccxt.binance({ enableRateLimit: false });
    const ccxtTickers = await exchange.fetchTickers(symbols);
    const formattedTickers: CryptoCurrencyTicker[] = [];

    for (var key in ccxtTickers) {
      if (ccxtTickers.hasOwnProperty(key)) {
        formattedTickers.push(ccxtTickers[key] as CryptoCurrencyTicker);
      }
    }

    return formattedTickers;
  }
}
