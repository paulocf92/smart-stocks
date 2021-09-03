import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import { formatStockData } from '../format';

export const selectStocks = (state: RootState) => state.stocks;

const selectStockData = (state: RootState) => state.stocks.stock;

const selectStockHistoricalData = (state: RootState) => state.stocks.historical;

export const stockDataSelector = createSelector(selectStockData, state =>
  formatStockData(state)
);

export const stockHistoricalDataSelector = createSelector(
  selectStockHistoricalData,
  state => state.filter(slice => slice.close !== null)
);
