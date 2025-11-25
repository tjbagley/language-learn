import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { Category } from '~/models/category';

export interface CategoriesState {
  values: Category[];
}

const initialState: CategoriesState = {
  values: [{
    id: '1',
    description: 'Noun'
  }, {
    id: '2',
    description: 'Verb'
  }, {
    id: '3',
    description: 'Adjective'
  }, {
    id: '4',
    description: 'Other'
  }, {
    id: '5',
    description: 'Greetings'
  }, {
    id: '6',
    description: 'Numbers'
  }]
}

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      const category = { ...action.payload, id: crypto.randomUUID() };
      state.values.push(category);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const category = state.values.find(c => c.id === action.payload.id);
      if (category) {
        category.description = action.payload.description;      
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(c => c.id !== action.payload);
    },
    loadCategories: (state, action: PayloadAction<Category[]>) => {
      state.values = action.payload;
    }
  }
});

export const { addCategory, updateCategory, removeCategory, loadCategories } = CategoriesSlice.actions;

// Export the slice reducer for use in the store configuration
export default CategoriesSlice.reducer;

export const selectAllCategories = (state: RootState) => state.categories.values;

const selectCategoryId = (state: RootState, id?: string) => id;
export const selectCategoryById = createSelector([selectAllCategories, selectCategoryId], (categories, id) => {
  return id ? categories.find(category =>
    category?.id === id
  ) : null;
});
