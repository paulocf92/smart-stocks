import { StockDataFormatted } from '../../../interfaces/stocks';

import { createAction } from '@reduxjs/toolkit';

export const addFavorite =
  createAction<StockDataFormatted>('@user/ADD_FAVORITE');
export const updateFavorite = createAction<StockDataFormatted>(
  '@user/UPDATE_FAVORITE'
);
export const removeFavorite = createAction<string>('@user/REMOVE_FAVORITE');
