import { StockData, StockDataFormatted } from '../../interfaces/stocks';

export const formatStockData = (data: StockData): StockDataFormatted => ({
  ...data,
  companyName: data.companyName?.replace(/ \-.+$/, ''),
  latestPriceStr: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(data.latestPrice),
  changeStr: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(data.change),
  changePercentStr: data.changePercent?.toFixed(3) + '%',
});
