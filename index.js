let isGoingToSell = false;
let isGoingToBuy = true;
let hasCurrency = false;

let priceToSellAt = undefined;
let priceToBuyAt = undefined;
let totalProfit = 0;
let amountOfDeals = 0;

let ticks = 0;

// TODO: rename
const percentageDifference = 0.002;

const ccxt = require("ccxt");
const exchange = new ccxt.binance({ enableRateLimit: true });

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
    priceToBuyAt = currentPrice - currentPrice * percentageDifference;
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

setInterval(runStrategy, 1000);

function shouldSellCurrency(ticker) {
  return ticker >= priceToSellAt;
}

function shouldBuyCurrency(ticker) {
  return ticker <= priceToBuyAt;
}

function reset() {
  hasCurrency = false;
  priceToBuyAt = undefined;
  priceToSellAt = undefined;
  ticks = 0;
}
