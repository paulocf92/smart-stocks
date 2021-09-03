import { createReducer } from '@reduxjs/toolkit';
import {
  StockData,
  HistoricalStockDataSlice,
} from '../../../interfaces/stocks';
import { getStockData } from './actions';

export type StockDataState = {
  currentStock: {
    data: StockData;
    historical: HistoricalStockDataSlice[];
  };
  pending: boolean;
  error: boolean;
};

const initialState: StockDataState = {
  currentStock: {
    data: {} as StockData,
    historical: [],
  },
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
      state.currentStock.data = payload.stockData;
      state.currentStock.historical = payload.stockHistoricalData;
    })
    .addCase(getStockData.rejected, state => {
      state.pending = false;
      state.error = true;
    });
});

export default stocksReducer;
