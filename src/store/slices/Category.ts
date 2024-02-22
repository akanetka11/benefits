import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { CategoryState } from '@store/types/Category.types';

const initialState: CategoryState = {
  selectedCategoryId: 0,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const { setCategoryId } = categorySlice.actions;

export const getCategoryId = (state: RootState) => state.category.selectedCategoryId;

export default categorySlice.reducer;
