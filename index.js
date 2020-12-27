const ccxt = require('ccxt');
const logger = require('signale');
const interactiveLogger = new logger.Signale({
  interactive: true,
});
const exchange = new ccxt.binance({ enableRateLimit: false });

let ticks = 0;
let totalProfit = 0;
let amountOfDeals = 0;
let hasCurrency = false;
let isBotPaused = false;
const maximumTicks = 150;
let priceToBuyAt = undefined;
let priceToSellAt = undefined;
const intervalDuration = 1500;
const profitPercentage = 0.002;

setInterval(runStrategy, intervalDuration);

async function runStrategy() {
  if (isBotPaused) {
    return;
  }

  const ticker = await exchange.fetchTicker('ETH/USDT').catch(logger.error);
  const currentPrice = ticker && ticker.close;

  ticks++;

  if (priceToBuyAt && priceToSellAt && process.env.NODE_ENV === undefined) {
    interactiveLogger.info('Current price: %d', currentPrice);
  }

  if (ticks > maximumTicks && !hasCurrency) {
    logger.warn('Resetting order prices.');
    ticks = 0;
    priceToBuyAt = undefined;
  }

  if (priceToBuyAt === undefined) {
    calculateWhenToBuyAndSell(currentPrice);
  }

  if (!hasCurrency && shouldBuyCurrency(currentPrice)) {
    logger.await('Bought currency.');
    hasCurrency = true;
  }

  if (hasCurrency && shouldSellCurrency(currentPrice)) {
    sellCurrencyAndReset();
  }
}

function calculateWhenToBuyAndSell(currentPrice) {
  priceToSellAt = currentPrice + currentPrice * (profitPercentage / 2);
  priceToBuyAt = currentPrice - currentPrice * (profitPercentage / 2);
  logger.info('Calculating prices.');
  logger.info('Current price: %d', currentPrice);
  logger.info('Price to buy at:  ', formatNumber(priceToBuyAt));
  logger.info('Price to sell at: ', formatNumber(priceToSellAt));
}

function sellCurrencyAndReset() {
  amountOfDeals++;
  totalProfit = totalProfit + (priceToSellAt - priceToBuyAt);

  logger.success('Sold currency.');
  logger.complete('Deals:', amountOfDeals);
  logger.complete('Total profit: ', formatNumber(totalProfit));

  reset();
  temporarlyPauseBot();
}

function temporarlyPauseBot() {
  logger.pause('Temporarly pausing bot.');
  isBotPaused = true;
  setTimeout(() => (isBotPaused = false), 1000 * 60 * 5);
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

function formatNumber(number) {
  return number && number.toFixed(2);
}
