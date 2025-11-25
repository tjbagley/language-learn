import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { WordOrPhrase, WordOrPhraseBasic } from '~/models/word-or-phrase';

export interface WordsAndPhrasesState {
  values: WordOrPhrase[];
  searchQuery?: string;
}

const initialState: WordsAndPhrasesState = {
  values: [{
    id: '1',
    value: 'bonjour',
    soundsLike: 'bon[d] jaw',
    meaning: 'Good morning',
    categories: ['5']
  },{
    id: '2',
    value: 'un',
    soundsLike: 'uh',
    meaning: 'one',
    categories: ['6']
  },{
    id: '3',
    value: 'deux',
    soundsLike: 'dir',
    meaning: 'two',
    categories: ['6']
  },{
    id: '4',
    value: 'trois',
    soundsLike: 'twah',
    meaning: 'three',
    categories: ['6']
  }],
  searchQuery: ''
};

export const wordsAndPhrasesSlice = createSlice({
  name: 'wordsAndPhrases',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<WordOrPhraseBasic>) => {
      const word = { ...action.payload, id: crypto.randomUUID() };
      state.values.push(word);
      state.searchQuery = word.value;
    },
    updateWord: (state, action: PayloadAction<WordOrPhraseBasic>) => {
      const word = state.values.find(word => word.id === action.payload.id);
      if (word) {
        word.value = action.payload.value;
        word.soundsLike = action.payload.soundsLike;
        word.meaning = action.payload.meaning;
        word.categories = action.payload.categories;
      }
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(word => word.id !== action.payload);
    },
    removeCategoryFromWords: (state, action: PayloadAction<string>) => {
      state.values.forEach(word => {
        word.categories = word.categories.filter(category => category !== action.payload);
      });
    },
    search: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    loadWords: (state, action: PayloadAction<WordOrPhrase[]>) => {
      state.values = action.payload;
    }
  }
});

export const { addWord, updateWord, removeWord, removeCategoryFromWords, search, loadWords } = wordsAndPhrasesSlice.actions;

// Export the slice reducer for use in the store configuration
export default wordsAndPhrasesSlice.reducer

export const selectAllWordsAndPhrases = (state: RootState) => state.wordsAndPhrases.values;
export const selectSearchQuery = (state: RootState) => state.wordsAndPhrases.searchQuery;

export const selectWordsBySearchQuery = createSelector([selectAllWordsAndPhrases, selectSearchQuery], (words, query) => {
  return query ? words.filter(word =>
    word?.value?.toLowerCase()?.includes(query?.toLowerCase()) ||
    word?.meaning?.toLowerCase()?.includes(query?.toLowerCase())
  ) : words;
});

const selectWordId = (state: RootState, id?: string) => id;
export const selectWordById = createSelector([selectAllWordsAndPhrases, selectWordId], (words, id) => {
  return id ? words.find(word =>
    word?.id === id
  ) : null;
});