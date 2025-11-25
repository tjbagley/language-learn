import { configureStore } from '@reduxjs/toolkit'

import wordsAndPhrasesReducer from './slices/words-phrases.slice'
import categoriesSliceReducer from './slices/categories.slice'
import wordListsReducer from './slices/word-lists.slice'

export const store = configureStore({
  reducer: {
    wordsAndPhrases: wordsAndPhrasesReducer,
    categories: categoriesSliceReducer,
    wordLists: wordListsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
