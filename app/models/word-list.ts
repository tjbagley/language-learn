import type { WordOrPhrase } from "./word-or-phrase";

export interface WordList {
  id: string;
  description: string;
  items: WordListItem[];
}

export interface WordListItem {
  actor?: string;
  wordOrPhraseId: string;
}

export interface WordListItemWithWordOrPhrase extends WordListItem {
  wordOrPhrase: WordOrPhrase;
}