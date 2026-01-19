import { configureStore } from '@reduxjs/toolkit'

import wordsAndPhrasesReducer from './slices/words-phrases.slice'
import categoriesSliceReducer from './slices/categories.slice'
import wordListsReducer from './slices/word-lists.slice'

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
  reducer: {
    wordsAndPhrases: wordsAndPhrasesReducer,
    categories: categoriesSliceReducer,
    wordLists: wordListsReducer
  },
})
}

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
