import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { WordList } from '~/models/word-list';

export interface WordListsState {
  values: WordList[];
}

const initialState: WordListsState = {
  values: [{
    id: '1',
    description: 'Numbers 1 - 3',
    items: [
      { actor: '', wordOrPhraseId: '2' },
      { actor: '', wordOrPhraseId: '3' },
      { actor: '', wordOrPhraseId: '4' }
    ] 
  }]
}

export const WordListsSlice = createSlice({
  name: 'wordLists',
  initialState,
  reducers: {
    addWordList: (state, action: PayloadAction<WordList>) => {
      const wordList = { ...action.payload, id: crypto.randomUUID() };
      state.values.push(wordList);
    },
    updateWordList: (state, action: PayloadAction<WordList>) => {
      const wordList = state.values.find(c => c.id === action.payload.id);
      if (wordList) {
        wordList.description = action.payload.description;
        wordList.items = action.payload.items;
      }
    },
    removeWordList: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(c => c.id !== action.payload);
    },
    removeWordFromLists: (state, action: PayloadAction<string>) => {
      state.values.forEach(wordList => {
        wordList.items = wordList.items.filter(item => item.wordOrPhraseId !== action.payload);
      });
    },
    loadWordLists: (state, action: PayloadAction<WordList[]>) => {
      state.values = action.payload;
    }
  }
});

export const { addWordList, updateWordList, removeWordList, removeWordFromLists, loadWordLists } = WordListsSlice.actions;

// Export the slice reducer for use in the store configuration
export default WordListsSlice.reducer;

export const selectAllWordLists = (state: RootState) => state.wordLists.values;

const selectWordListId = (state: RootState, id?: string) => id;
export const selectWordListById = createSelector([selectAllWordLists, selectWordListId], (wordLists, id) => {
  return id ? wordLists.find(wordList =>
    wordList?.id === id
  ) : null;
});
