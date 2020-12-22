const ccxt = require('ccxt');
const logger = require('signale');
const interactiveLogger = new logger.Signale({
  interactive: true,
});

let ticks = 0;
let totalProfit = 0;
let amountOfDeals = 0;
let hasCurrency = false;
const maximumTicks = 300;
let priceToBuyAt = undefined;
let priceToSellAt = undefined;
const intervalDuration = 1000;
const profitPercentage = 0.002;

let isBotPaused = false;

const exchange = new ccxt.binance({ enableRateLimit: false });

setInterval(runStrategy, intervalDuration);

async function runStrategy() {
  if (isBotPaused) {
    return;
  }

  const ticker = await exchange.fetchTicker('ETH/USDT');
  const currentPrice = ticker && ticker.close;

  ticks++;

  interactiveLogger.info('Current price: %d', currentPrice);

  if (ticks > maximumTicks && !hasCurrency) {
    logger.warn('Resetting order prices.');
    ticks = 0;
    priceToBuyAt = undefined;
  }

  if (priceToBuyAt === undefined) {
    priceToSellAt = currentPrice;
    priceToBuyAt = currentPrice - currentPrice * profitPercentage;
    logger.info('Calculating prices.');
    logger.info('Price to buy at: ', priceToBuyAt);
    logger.info('Price to sell at: ', priceToSellAt);
  }

  if (!hasCurrency && shouldBuyCurrency(currentPrice)) {
    logger.info('Buying currency.');
    hasCurrency = true;
  }

  if (hasCurrency && shouldSellCurrency(currentPrice)) {
    logger.info('Selling currency.');
    totalProfit = totalProfit + (priceToSellAt - priceToBuyAt);
    amountOfDeals++;
    logger.success('Amount of deals:', amountOfDeals);
    logger.success('Total profit: ', totalProfit);
    reset();
    temporarlyPauseBot();
  }
}

function temporarlyPauseBot() {
  logger.info('Temporarly pausing bot.');
  isBotPaused = true;
  setTimeout(() => (isBotPaused = false), 10000);
}

function logInfoToConsole(currentPrice) {
  logger.log('currentPrice: ', currentPrice.toFixed(2));
  logger.log('priceToBuyAt: ', priceToBuyAt && priceToBuyAt.toFixed(2));
  logger.log('priceToSellAt:', priceToBuyAt && priceToSellAt.toFixed(2));
  logger.log('amountOfDeals:', amountOfDeals);
  logger.log('totalProfit: ', totalProfit);
  logger.log('hasCurrency: ', hasCurrency);
  if (!hasCurrency) {
    logger.log('ticks: ', ticks);
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
