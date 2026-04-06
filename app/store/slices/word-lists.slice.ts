import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type { WordList } from '~/models/word-list';
import { SaveService } from '~/services/save.service';
import { LocalStorageService } from '~/services/local-storage.service';

export interface WordListsState {
  values: WordList[];
}

const localStorageData = LocalStorageService.load();
const initialState: WordListsState = localStorageData ? {values: localStorageData.language?.dialogues ?? []} : {
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
      if (!action.payload.id) {
        action.payload.id = crypto.randomUUID();
      }
      state.values.push(action.payload);
      state.values = sortLists(state.values);
      SaveService.notifySaveRequired();
    },
    updateWordList: (state, action: PayloadAction<WordList>) => {
      const wordList = state.values.find(c => c.id === action.payload.id);
      if (wordList) {
        wordList.description = action.payload.description;
        wordList.items = action.payload.items;
      }
      state.values = sortLists(state.values);
      SaveService.notifySaveRequired();
    },
    removeWordList: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(c => c.id !== action.payload);
      SaveService.notifySaveRequired();
    },
    removeWordFromLists: (state, action: PayloadAction<string>) => {
      state.values.forEach(wordList => {
        wordList.items = wordList.items.filter(item => item.wordOrPhraseId !== action.payload);
      });
      SaveService.notifySaveRequired();
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

function sortLists(lists: WordList[]): WordList[] {
  lists.sort((a: WordList, b: WordList): number => {
    return a.description.localeCompare(b.description);
  });
  return lists;
}
