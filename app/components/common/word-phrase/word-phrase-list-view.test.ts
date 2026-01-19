import { describe, expect, it } from 'vitest'
import { WordPhraseListView } from './word-phrase-list-view'

describe('WordPhraseListView', () => {
  it('matches snapshot', () => {
    const result = WordPhraseListView({ 
      wordOrPhrase: {
        id: '1',
        value: 'Test',
        soundsLike: 'tess t',
        meaning: 'test',
        categories: ['1']
      }
    });
    expect(result).toMatchSnapshot();
  });
});