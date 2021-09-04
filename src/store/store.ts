import { configureStore } from '@reduxjs/toolkit';

import { stocksReducer } from './modules/stocks';
import { userReducer } from './modules/user';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
