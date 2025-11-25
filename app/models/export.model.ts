import type { Category } from "./category";
import type { WordList } from "./word-list";
import type { WordOrPhrase } from "./word-or-phrase";

export interface ExportModel {
  exportDate?: string;
  language: ExportLanguage;
  categories: Category[];
}

export interface ExportLanguage {
  wordsOrPhrases: WordOrPhrase[];
  learn?: {
    recentWordsAndPhrases: string[];
  };
  dialogues?: WordList[];
}