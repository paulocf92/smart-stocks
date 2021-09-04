import { createSelector } from '@reduxjs/toolkit';
import { StockDataFormatted } from '../../../interfaces/stocks';
import { RootState } from '../../store';
import { formatStockData } from '../format';

export const selectStocks = (state: RootState) => state.stocks;

const selectStockData = (state: RootState) => state.stocks.currentStock.data;

const selectStockHistoricalData = (state: RootState) =>
  state.stocks.currentStock.historical;

const selectRecentlyBrowsed = (state: RootState) =>
  state.stocks.recentlyBrowsed;

type StockDataFormattedType = {
  [id: string]: StockDataFormatted;
};
export const recentlyBrowsedSelector = createSelector(
  selectRecentlyBrowsed,
  state => {
    let companies: StockDataFormattedType = {} as StockDataFormattedType;
    state.symbols.forEach((symbol: string) => {
      companies[symbol] = formatStockData(state.companies[symbol]);
    });

    const transformedData = { ...state, companies };

    return transformedData;
  }
);

export const stockDataSelector = createSelector(selectStockData, state =>
  formatStockData(state)
);

export const stockHistoricalDataSelector = createSelector(
  selectStockHistoricalData,
  state => state.filter(slice => slice.close !== null)
);
