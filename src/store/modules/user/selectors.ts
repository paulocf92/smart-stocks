import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUser = (state: RootState) => state.user;

const selectSymbols = (state: RootState) => state.user.symbols;

export const symbolsSelector = createSelector(selectSymbols, state =>
  state.length ? state : undefined
);
