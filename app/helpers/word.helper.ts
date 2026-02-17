import { type WordOrPhrase } from '../models/word-or-phrase';
import moment from 'moment';

export class WordHelper {
  public static markAsLearntCorrect(wordOrPhrase: WordOrPhrase | undefined): void {
    if (!wordOrPhrase) {
      return;
    }

    if (!wordOrPhrase.learn) {
      wordOrPhrase.learn = {
        level: 0,
        date: '',
        numCorrectInARow: 0,
      };
    }
    wordOrPhrase.learn.numCorrectInARow += 1;
    const nextLevel = (wordOrPhrase.learn.level || 0) + 1;
    if (wordOrPhrase.learn.numCorrectInARow >= nextLevel) {
      wordOrPhrase.learn.level = nextLevel;
      wordOrPhrase.learn.numCorrectInARow = 0;
    }
    wordOrPhrase.learn.date = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  public static markAsLearntIncorrect(wordOrPhrase: WordOrPhrase | undefined): void {
    if (!wordOrPhrase) {
      return;
    }
    if (!wordOrPhrase.learn) {
      wordOrPhrase.learn = {
        level: 0,
        date: '',
        numCorrectInARow: 0,
      };
    }
    wordOrPhrase.learn.level = 0;
    wordOrPhrase.learn.numCorrectInARow = 0;
    wordOrPhrase.learn.date = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  public static getRandomWordOrPhrase(
    words: WordOrPhrase[],
    categoryIds: string[],
    excludedWordOrPhraseIds: string[],
    recentlyLearntWordsAndPhrases: string[],
  ): WordOrPhrase {
    let filteredWords = words;
    if (!excludedWordOrPhraseIds?.length) {
      excludedWordOrPhraseIds = recentlyLearntWordsAndPhrases || [];
    }
    filteredWords = words.filter((word) => !excludedWordOrPhraseIds.includes(word.id));
    if (filteredWords.length === 0 && excludedWordOrPhraseIds.length > 0) {
      filteredWords = words.filter(
        (word) => excludedWordOrPhraseIds[excludedWordOrPhraseIds.length - 1] !== word.id,
      );
      if (filteredWords.length === 0) {
        filteredWords = words;
      }
    }

    if (categoryIds && categoryIds.length > 0) {
      const categoryFilteredWords = filteredWords.filter((word) =>
        word.categories.some((categoryId) => categoryIds.includes(categoryId)),
      );
      if (categoryFilteredWords.length > 0) {
        filteredWords = categoryFilteredWords;
      }
    }

    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  }

  public static getRandomWordOrPhraseWithLowestLearnLevel(
    words: WordOrPhrase[],
    categoryIds: string[],
    excludedWordOrPhraseIds: string[],
    recentlyLearntWordsAndPhrases: string[],
  ): WordOrPhrase {
    const randomWords = [];
    for (let i = 0; i <= 10; i++) {
      const word = this.getRandomWordOrPhrase(
        words,
        categoryIds,
        excludedWordOrPhraseIds,
        recentlyLearntWordsAndPhrases,
      );
      randomWords.push(word);
    }
    randomWords.sort((a: WordOrPhrase, b: WordOrPhrase): number => {
      const aLevel = a.learn?.level || 0;
      const bLevel = b.learn?.level || 0;
      return aLevel - bLevel;
    });
    return randomWords[0];
  }
}
