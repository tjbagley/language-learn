import "./word-list-view.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectWordListById } from "~/store/slices/word-lists.slice";
import { selectAllWordsAndPhrases, setWordEditReturnRoute } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import { WordPhraseListView } from "../common/word-phrase/word-phrase-list-view";
import type { WordOrPhrase } from "~/models/word-or-phrase";
import { SectionHeader } from "../common/section-header/section-header";

export interface WordListViewProps {
  id: string;
}

export function WordListView(props: WordListViewProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wordList = useSelector((state: RootState) => selectWordListById(state, props.id));
  const words = useSelector((state: RootState) => selectAllWordsAndPhrases(state));

  const handleViewClick = (id: string) => {
    navigate(`/lists/${id}`);
  }

  const handleWordClick = (id: string) => {
    dispatch(setWordEditReturnRoute({ route: "/list-view", routeId: props.id }));
    navigate(`/words/${id}`);
  }

  const getWordOrPhraseDisplay = (wordOrPhraseId: string): WordOrPhrase => {
    return words.find(wp => wp.id === wordOrPhraseId) || { id: "", value: "", soundsLike: "", meaning: "", categories: [] };
  }

  return (
    <React.Fragment>
      <SectionHeader heading={wordList?.description} buttonLabel="Edit" onButtonClick={() => handleViewClick(props.id)} />
      <ul className="word-list-view__items">
        {wordList?.items.map((item, index) => (
          <li key={index} onClick={() => handleWordClick(item.wordOrPhraseId)}>
            {item.actor && <span className="word-list-view__actor">{item.actor}</span>}
            <WordPhraseListView wordOrPhrase={getWordOrPhraseDisplay(item.wordOrPhraseId)} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}