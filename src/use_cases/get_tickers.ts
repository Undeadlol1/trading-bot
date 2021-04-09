import { CryptoCurrencyTicker } from '../entities/CryptoCurrencyTicker';
import { GetMultipleCryptoTickers } from '../repositories/get_multiple_crypto_tickers';

export async function getTickers({
  symbols,
  di,
}: {
  symbols: string[];
  di: { getTickers: GetMultipleCryptoTickers };
}): Promise<CryptoCurrencyTicker[]> {
  const tickers = di.getTickers.run({ symbols });
  return tickers;
}
