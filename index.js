let isGoingToSell = false;
let isGoingToBuy = true;
let hasCurrency = false;

const priceToSellAt = 646;
const priceToBuyAt = 645.5;
let totalProfit = 0;

(async function test() {
  const ccxt = require("ccxt");
  const exchange = new ccxt.binance({ enableRateLimit: true });

  while (true) {
    const ticker = await exchange.fetchTicker("ETH/USDT");
    const tickerPrice = ticker && ticker.close;
    console.log("ticker.close", tickerPrice);
    console.log("totalProfit: ", totalProfit);
    console.log("hasCurrency: ", hasCurrency);

    if (!hasCurrency && shouldBuyCurrency(tickerPrice)) {
      console.log("Buying currency.");
      hasCurrency = true;
    }

    if (hasCurrency && shouldSellCurrency(tickerPrice)) {
      console.log("Selling currency.");
      hasCurrency = false;
      totalProfit = totalProfit + (priceToBuyAt - priceToSellAt);
    }
  }
})();

function shouldSellCurrency(ticker) {
  return ticker >= priceToSellAt;
}

function shouldBuyCurrency(ticker) {
  return ticker <= priceToBuyAt;
}
