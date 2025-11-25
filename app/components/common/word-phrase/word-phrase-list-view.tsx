import "./word-phrase-list-view.scss";

import type { WordOrPhrase } from "~/models/word-or-phrase";

export interface WordPhraseListViewProps {
  wordOrPhrase: WordOrPhrase;
}

export function WordPhraseListView(props: WordPhraseListViewProps) {
  return (
    <div className="word-phrase-list-view">
      <div className="word-phrase-list-view__value">{props.wordOrPhrase.value}</div>
      <div className="word-phrase-list-view__sounds-like">{props.wordOrPhrase.soundsLike}</div>
      <div className="word-phrase-list-view__meaning">{props.wordOrPhrase.meaning}</div>
    </div>
  );
}