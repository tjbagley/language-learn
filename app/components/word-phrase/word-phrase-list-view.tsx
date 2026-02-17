import "./word-phrase-list-view.scss";

import type { WordOrPhrase } from "~/models/word-or-phrase";
import soundIcon from "../../assets/sound.svg";

export interface WordPhraseListViewProps {
  wordOrPhrase: WordOrPhrase;
}

export function WordPhraseListView(props: WordPhraseListViewProps) {
  return (
    <div className="word-phrase-list-view">
      <div className="word-phrase-list-view__value">{props.wordOrPhrase.value}</div>
      <div className="word-phrase-list-view__sounds-like">{props.wordOrPhrase.soundsLike}</div>
      <div className="word-phrase-list-view__meaning">{props.wordOrPhrase.meaning}</div>
      <div className="word-phrase-list-view__info" onClick={e => e.stopPropagation()}>
        {!!props.wordOrPhrase.learn?.level && <div className="word-phrase-list-view__level">learn level: {props.wordOrPhrase.learn?.level}</div>}
        <a href={`https://translate.google.com/?sl=fr&tl=en&text=${encodeURIComponent(props.wordOrPhrase.value)}&op=translate`} target="_blank" rel="noreferrer">
          <img src={soundIcon} alt="Google Translate" />
        </a>
      </div>
    </div>    
  );
}