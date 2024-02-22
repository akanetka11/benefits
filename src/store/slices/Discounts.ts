import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { DiscountsState, DiscountsType } from '../types/Discounts.types';

const initialState: DiscountsState = {
  discounts: [],
  newDiscounts: null,
};

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setDiscounts: (state, action: PayloadAction<DiscountsType[]>) => {
      state.discounts = action.payload;
    },
    setNewDiscounts: (state, action: PayloadAction<DiscountsType>) => {
      state.newDiscounts = action.payload;
    },
    updateFavoriteStatus: (
      state,
      action: PayloadAction<{ categoryId: number; itemId: number }>
    ) => {
      const updatedData = state.discounts.map((category) => {
        if (category.id === action.payload.categoryId) {
          const updatedItems = category?.data.map((item) => {
            if (item.id === action.payload.itemId) {
              return {
                ...item,
                isSavedToFavorites: !item.isSavedToFavorites,
              };
            }
            return item;
          });
          return { ...category, data: updatedItems };
        }
        return category;
      });
      state.discounts = updatedData;
    },
  },
});

export const { setDiscounts, setNewDiscounts, updateFavoriteStatus } =
  discountsSlice.actions;

export const getDiscounts = (state: RootState) => state.discounts.discounts;
export const getNewDiscounts = (state: RootState) => state.discounts.newDiscounts;

export default discountsSlice.reducer;
