import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  StockData,
  HistoricalStockDataSlice,
} from '../../../interfaces/stocks';
import { api } from '../../../services/api';

export const getStockData = createAsyncThunk(
  '@stocks/GET_STOCK_DATA',
  async (ticker: string) => {
    console.log({ ticker });

    const stockRequests = Promise.all([
      api.get<StockData>(`/${ticker}/quote`, {
        params: {
          token: process.env.NEXT_PUBLIC_IEXCLOUD_TOKEN,
        },
      }),
      api.get<HistoricalStockDataSlice[]>(`/${ticker}/chart/today`, {
        params: {
          chartInterval: 30,
          token: process.env.NEXT_PUBLIC_IEXCLOUD_TOKEN,
        },
      }),
    ]);

    const [stock, historical] = await stockRequests;

    return { stockData: stock.data, stockHistoricalData: historical.data };
  }
);
