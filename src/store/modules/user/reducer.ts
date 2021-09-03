import { createReducer } from '@reduxjs/toolkit';
import { StockDataFormatted } from '../../../interfaces/stocks';
import { addFavorite, removeFavorite, updateFavorite } from './actions';

export type UserDataState = {
  user: {
    name: string;
  };
  favorites: {
    favorites: {
      [id: string]: StockDataFormatted;
    };
    symbols: string[];
  };
};

const initialState: UserDataState = {
  user: {
    name: 'Paulo Cezar Bueno Barbosa Filho',
  },
  favorites: {
    favorites: {},
    symbols: [],
  },
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(addFavorite, (state, { payload }) => {
      state.favorites.favorites[payload.symbol] = payload;
      state.favorites.symbols.push(payload.symbol);
    })
    .addCase(updateFavorite, (state, { payload }) => {
      const current = state.favorites.favorites[payload.symbol];
      state.favorites.favorites[payload.symbol] = { ...current, ...payload };
    })
    .addCase(removeFavorite, (state, { payload }) => {
      delete state.favorites.favorites[payload];
      state.favorites.symbols = state.favorites.symbols.filter(
        symbol => symbol !== payload
      );
    });
});

export default userReducer;
