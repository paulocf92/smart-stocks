export interface StockData {
  companyName: string;
  symbol: string;
  latestPrice: number;
  change: number;
  changePercent: number;
}

export interface StockDataFormatted extends StockData {
  latestPriceStr: string;
  changeStr: string;
  changePercentStr: string;
}

export interface HistoricalStockDataSlice {
  minute: string;
  close: number;
}
