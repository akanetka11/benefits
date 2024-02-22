import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { FavoritesState } from '../types/Favorites.types';
import { DiscountItemType } from '@shared/types';

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<DiscountItemType>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const filteredData = state.favorites.filter((item) => item.id !== action.payload);
      state.favorites = filteredData;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const getFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
