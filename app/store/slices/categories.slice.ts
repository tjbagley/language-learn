import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { Category } from '~/models/category';
import { SaveService } from '~/services/save.service';
import { LocalStorageService } from '~/services/local-storage.service';

export interface CategoriesState {
  values: Category[];
}

const localStorageData = LocalStorageService.load();
const initialState: CategoriesState = localStorageData ? {values: localStorageData?.categories ?? []} : {
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
      if (!action.payload.id) {
        action.payload.id = crypto.randomUUID();
      }
      state.values.push(action.payload);
      state.values = sortCategories(state.values);
      SaveService.notifySaveRequired();
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const category = state.values.find(c => c.id === action.payload.id);
      if (category) {
        category.description = action.payload.description;      
      }
      state.values = sortCategories(state.values);
      SaveService.notifySaveRequired();
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(c => c.id !== action.payload);
      SaveService.notifySaveRequired();
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

function sortCategories(lists: Category[]): Category[] {
  lists.sort((a: Category, b: Category): number => {
    return a.description.localeCompare(b.description);
  });
  return lists;
}