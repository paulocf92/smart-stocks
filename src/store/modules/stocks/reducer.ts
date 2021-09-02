import { createReducer } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  StockData,
  HistoricalStockDataSlice,
} from '../../../interfaces/stocks';
import { getStockData } from './actions';

export type StockDataState = {
  stock: StockData;
  historical: HistoricalStockDataSlice[];
  pending: boolean;
  error: boolean;
};

const initialState: StockDataState = {
  stock: {} as StockData,
  historical: [],
  pending: false,
  error: false,
};

export const stocksReducer = createReducer(initialState, builder => {
  builder
    /* Stock data (company and historical) */
    .addCase(getStockData.pending, state => {
      state.pending = true;
    })
    .addCase(getStockData.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.stock = payload.stockData;
      state.historical = payload.stockHistoricalData;
    })
    .addCase(getStockData.rejected, state => {
      state.pending = false;
      state.error = true;
    });
});

export default stocksReducer;
