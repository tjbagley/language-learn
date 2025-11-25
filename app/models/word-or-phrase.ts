export interface WordOrPhraseBasic {
  id: string;
  value: string;
  soundsLike: string;
  meaning: string;
  categories: string[];
}

export interface WordOrPhrase extends WordOrPhraseBasic {
    learn?: {
      level: number;
      date: string;
      numCorrectInARow: number;
    };
  }