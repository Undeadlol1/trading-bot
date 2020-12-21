let ticks = 0;
let totalProfit = 0;
let amountOfDeals = 0;
let hasCurrency = false;
let priceToBuyAt = undefined;
let priceToSellAt = undefined;
const profitPercentage = 0.002;
const intervalDuration = 2000;

const ccxt = require("ccxt");
const exchange = new ccxt.kraken({ enableRateLimit: true });

setInterval(runStrategy, intervalDuration);

async function runStrategy() {
  ticks++;

  const ticker = await exchange.fetchTicker("ETH/USDT");
  const currentPrice = ticker && ticker.close;
  console.log("currentPrice", currentPrice.toFixed(2));
  console.log("priceToBuyAt: ", priceToBuyAt && priceToBuyAt.toFixed(2));
  console.log("priceToSellAt: ", priceToBuyAt && priceToSellAt.toFixed(2));
  console.log("amountOfDeals: ", amountOfDeals);
  console.log("totalProfit: ", totalProfit);
  console.log("hasCurrency: ", hasCurrency);
  console.log("ticks: ", ticks);

  // TODO: improve this?
  // TODO: use ticker.date instead?
  if (ticks > 500 && !hasCurrency) {
    ticks = 0;
    priceToBuyAt = undefined;
  }

  if (priceToBuyAt === undefined) {
    console.log('Setting buy and sell prices.')
    priceToBuyAt = currentPrice - currentPrice * profitPercentage;
    priceToSellAt = currentPrice;
  }

  if (!hasCurrency && shouldBuyCurrency(currentPrice)) {
    console.log("Buying currency.");
    hasCurrency = true;
  }

  if (hasCurrency && shouldSellCurrency(currentPrice)) {
    console.log("Selling currency.");
    totalProfit = totalProfit + (priceToSellAt - priceToBuyAt);
    amountOfDeals++;
    reset();
  }
}

function shouldSellCurrency(ticker) {
  return ticker >= priceToSellAt;
}

function shouldBuyCurrency(ticker) {
  return ticker <= priceToBuyAt;
}

function reset() {
  ticks = 0;
  hasCurrency = false;
  priceToBuyAt = undefined;
  priceToSellAt = undefined;
}
