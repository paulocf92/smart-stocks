import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectStocks = (state: RootState) => state.stocks;

const selectStockData = (state: RootState) => state.stocks.stock;

const selectStockHistoricalData = (state: RootState) => state.stocks.historical;

export const stockDataSelector = createSelector(selectStockData, state => ({
  ...state,
  latestPriceStr: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(state.latestPrice),
  changeStr: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(state.change),
  changePercentStr: state.changePercent?.toFixed(3) + '%',
}));

export const stockHistoricalDataSelector = createSelector(
  selectStockHistoricalData,
  state => state.filter(slice => slice.close !== null)
);
