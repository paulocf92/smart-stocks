import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUser = (state: RootState) => state.user;

export const favoritesSelector = createSelector(
  selectUser,
  state => state.favorites
);
