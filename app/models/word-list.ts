export interface WordList {
  id: string;
  description: string;
  items: WordListItem[];
}

export interface WordListItem {
  actor?: string;
  wordOrPhraseId: string;
}
