import "./word-list-view.scss";

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectWordListById } from "~/store/slices/word-lists.slice";
import { selectAllWordsAndPhrases } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import { WordPhraseListView } from "../common/word-phrase/word-phrase-list-view";
import type { WordOrPhrase } from "~/models/word-or-phrase";

export interface WordListViewProps {
  id: string;
}

export function WordListView(props: WordListViewProps) {
  const navigate = useNavigate();
  const wordList = useSelector((state: RootState) => selectWordListById(state, props.id));
  const words = useSelector((state: RootState) => selectAllWordsAndPhrases(state));

  const handleViewClick = (id: string) => {
    navigate(`/lists/${id}`);
  }

  function getWordOrPhraseDisplay(wordOrPhraseId: string): WordOrPhrase {
    return words.find(wp => wp.id === wordOrPhraseId) || { id: "", value: "", soundsLike: "", meaning: "", categories: [] };
  }

  return (
    <React.Fragment>
      <div className="list-header">
        <h1>{wordList?.description}</h1>
        <button onClick={() => handleViewClick(props.id)}>Edit</button>
      </div>
      <ul className="word-list-view__items list--no-row-click">
        {wordList?.items.map((item, index) => (
          <li key={index}>
            {item.actor && <span className="word-list-view__actor">{item.actor}</span>}
            <WordPhraseListView wordOrPhrase={getWordOrPhraseDisplay(item.wordOrPhraseId)} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}