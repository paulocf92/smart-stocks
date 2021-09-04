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
  recentlyBrowsed: {
    companies: {
      [id: string]: StockData;
    };
    symbols: string[];
  };
  pending: boolean;
  error: boolean;
};

const initialState: StockDataState = {
  currentStock: {
    data: {} as StockData,
    historical: [],
  },
  recentlyBrowsed: {
    companies: {},
    symbols: [],
  },
  pending: false,
  error: false,
};

export const stocksReducer = createReducer(initialState, builder => {
  builder
    /* Stock data (company and historical) */
    .addCase(getStockData.pending, state => {
      state.pending = true;
      state.error = false;
    })
    .addCase(getStockData.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.currentStock.data = payload.stockData;
      state.currentStock.historical = payload.stockHistoricalData;

      const { symbol: retrievedStockSymbol } = payload.stockData;

      const companyExists =
        !!state.recentlyBrowsed.companies[retrievedStockSymbol]?.symbol;

      if (companyExists) {
        delete state.recentlyBrowsed.companies[retrievedStockSymbol];

        state.recentlyBrowsed.symbols = [
          retrievedStockSymbol,
          ...state.recentlyBrowsed.symbols.filter(
            symbol => symbol !== retrievedStockSymbol
          ),
        ];
      } else {
        state.recentlyBrowsed.symbols.unshift(retrievedStockSymbol);
      }

      state.recentlyBrowsed.companies[retrievedStockSymbol] = payload.stockData;
    })
    .addCase(getStockData.rejected, state => {
      state.pending = false;
      state.error = true;
    });
});

export default stocksReducer;
