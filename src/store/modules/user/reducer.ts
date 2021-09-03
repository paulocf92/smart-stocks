import { createReducer } from '@reduxjs/toolkit';
import { StockDataFormatted } from '../../../interfaces/stocks';
import { addFavorite, removeFavorite, updateFavorite } from './actions';

export type UserDataState = {
  user: {
    name: string;
  };
  favorites: {
    [id: string]: StockDataFormatted;
  };
  symbols: string[];
};

const initialState: UserDataState = {
  user: {
    name: 'Paulo Cezar Bueno Barbosa Filho',
  },
  favorites: {},
  symbols: [],
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(addFavorite, (state, { payload }) => {
      state.favorites[payload.symbol] = payload;
      state.symbols.push(payload.symbol);
    })
    .addCase(updateFavorite, (state, { payload }) => {
      const current = state.favorites[payload.symbol];
      state.favorites[payload.symbol] = { ...current, ...payload };
    })
    .addCase(removeFavorite, (state, { payload }) => {
      delete state.favorites[payload];
      state.symbols = state.symbols.filter(symbol => symbol !== payload);
    });
});

export default userReducer;
