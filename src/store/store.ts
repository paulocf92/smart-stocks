import { configureStore } from '@reduxjs/toolkit';

import { stocksReducer } from './modules/stocks';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
