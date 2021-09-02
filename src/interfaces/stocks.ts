export interface StockData {
  companyName: string;
  symbol: string;
  latestPrice: number;
  change: number;
  changePercent: number;
}

export interface HistoricalStockDataSlice {
  minute: string;
  close: number;
}
