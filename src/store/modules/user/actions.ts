import { StockData } from '../../../interfaces/stocks';

import { createAction } from '@reduxjs/toolkit';

export const addFavorite = createAction<StockData>('@user/ADD_FAVORITE');
export const updateFavorite = createAction<StockData>('@user/UPDATE_FAVORITE');
export const removeFavorite = createAction<string>('@user/REMOVE_FAVORITE');
