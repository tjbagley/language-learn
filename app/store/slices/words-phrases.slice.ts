import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { WordOrPhrase, WordOrPhraseBasic } from '~/models/word-or-phrase';
import moment from 'moment';
import { WordHelper } from '~/helpers/word.helper';

export interface WordsAndPhrasesState {
  values: WordOrPhrase[];
  searchQuery?: string;
  recentlyLearntWordsAndPhrases: string[];
  whatToLearnListId?: string;
  learn?: {
    wordToLearn: WordOrPhrase;
    choice1: WordOrPhrase;
    choice2: WordOrPhrase;
  };
  wordEditReturnRoute?: {
    route: string;
    routeId?: string;
  }
}

const initialState: WordsAndPhrasesState = {
  values: [{
    id: '1',
    value: 'bonjour',
    soundsLike: 'bon[d] [a]zure',
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
  searchQuery: '',
  recentlyLearntWordsAndPhrases: []
};

export const wordsAndPhrasesSlice = createSlice({
  name: 'wordsAndPhrases',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<WordOrPhraseBasic>) => {
      const word = { ...action.payload, id: crypto.randomUUID() };
      state.values.push(word);
      state.searchQuery = word.value;
      state.values = sortWordsAndPhrases(state.values);
    },
    updateWord: (state, action: PayloadAction<WordOrPhraseBasic>) => {
      const word = state.values.find(word => word.id === action.payload.id);
      if (word) {
        word.value = action.payload.value;
        word.soundsLike = action.payload.soundsLike;
        word.meaning = action.payload.meaning;
        word.categories = action.payload.categories;
      }
      state.values = sortWordsAndPhrases(state.values);
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
    },
    addRecentlyLearntWord: (state, action: PayloadAction<WordOrPhrase>) => {
      if (state.recentlyLearntWordsAndPhrases.length >= 20) {
        state.recentlyLearntWordsAndPhrases.shift();
      }
      state.recentlyLearntWordsAndPhrases = state.recentlyLearntWordsAndPhrases.filter(id => id !== action.payload.id);
      state.recentlyLearntWordsAndPhrases.push(action.payload.id);
    },
    loadRecentlyLearntWordsAndPhrases: (state, action: PayloadAction<string[]>) => {
      state.recentlyLearntWordsAndPhrases = action.payload;
    },
    setupWordToLearn: (state, action: PayloadAction<string[]>) => {
      const wordsInList = !!action.payload && action.payload.length > 0 ? state.values.filter(word => 
        action.payload.includes(word.id)
      ) : state.values;
      const wordToLearn = WordHelper.getRandomWordOrPhraseWithLowestLearnLevel(wordsInList, [], [], state.recentlyLearntWordsAndPhrases);
      const choice1 = WordHelper.getRandomWordOrPhrase(state.values, wordToLearn.categories, [wordToLearn.id], state.recentlyLearntWordsAndPhrases);
      const choice2 = WordHelper.getRandomWordOrPhrase(state.values, wordToLearn.categories, [wordToLearn.id, choice1.id], state.recentlyLearntWordsAndPhrases);
      const learn = {
        wordToLearn: wordToLearn,
        choice1: choice1,
        choice2: choice2
      }
      state.learn = learn;
    },
    setWordLearntAsCorrect: (state) => {
      if (state.learn?.wordToLearn) {
        const word = state.values.find(wp => wp.id === state.learn?.wordToLearn.id);
        WordHelper.markAsLearntCorrect(word);
      }
    },
    setWordLearntAsIncorrect: (state) => {
      if (state.learn?.wordToLearn) {
        const word = state.values.find(wp => wp.id === state.learn?.wordToLearn.id);
        WordHelper.markAsLearntIncorrect(word);
      }
    },
    setWhatToLearnListId: (state, action: PayloadAction<string | undefined>) => {
      state.whatToLearnListId = action.payload;
    },
    setWordEditReturnRoute: (state, action: PayloadAction<{ route: string; routeId?: string }>) => {
      state.wordEditReturnRoute = action.payload;
    }
  }
});

export const { addWord, updateWord, removeWord, removeCategoryFromWords, search, loadWords, addRecentlyLearntWord, loadRecentlyLearntWordsAndPhrases, setupWordToLearn, setWordLearntAsCorrect, setWordLearntAsIncorrect, setWhatToLearnListId, setWordEditReturnRoute } = wordsAndPhrasesSlice.actions;
// Export the slice reducer for use in the store configuration
export default wordsAndPhrasesSlice.reducer

export const selectAllWordsAndPhrases = (state: RootState) => state.wordsAndPhrases.values;
export const selectSearchQuery = (state: RootState) => state.wordsAndPhrases.searchQuery;
export const selectRecentlyLearntWordsAndPhrases = (state: RootState) => state.wordsAndPhrases.recentlyLearntWordsAndPhrases;
export const selectLearn = (state: RootState) => state.wordsAndPhrases.learn;
export const selectWhatToLearnListId = (state: RootState) => state.wordsAndPhrases.whatToLearnListId;
export const selectWordEditReturnRoute = (state: RootState) => state.wordsAndPhrases.wordEditReturnRoute;

export const selectWordsBySearchQuery = createSelector([selectAllWordsAndPhrases, selectSearchQuery], (words, query) => {
  return query ? words.filter(word =>
    word?.value?.toLowerCase()?.includes(query?.toLowerCase()) ||
    word?.meaning?.toLowerCase()?.includes(query?.toLowerCase())
  ) : [];
});

const selectWordId = (state: RootState, id?: string) => id;
export const selectWordById = createSelector([selectAllWordsAndPhrases, selectWordId], (words, id) => {
  return id ? words.find(word =>
    word?.id === id
  ) : null;
});

const selectCategoryId = (state: RootState, id?: string) => id;
export const selectWordsByCategoryId = createSelector([selectAllWordsAndPhrases, selectCategoryId], (words, id) => {
  return id ? words.filter(word =>
    word?.categories?.includes(id)
  ) : [];
});

function sortWordsAndPhrases(words: WordOrPhrase[]): WordOrPhrase[] {
  words.sort((a: WordOrPhrase, b: WordOrPhrase): number => {
    return a.value.localeCompare(b.value);
  });
  return words;
}