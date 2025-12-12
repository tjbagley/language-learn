import "./learn.scss";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { addRecentlyLearntWord, selectAllWordsAndPhrases, selectLearn, selectWhatToLearnListId, setupWordToLearn, setWhatToLearnListId, setWordLearntAsCorrect, setWordLearntAsIncorrect } from "~/store/slices/words-phrases.slice";
import type { WordOrPhrase } from "~/models/word-or-phrase";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../common/spinner/spinner";
import { selectAllWordLists } from "~/store/slices/word-lists.slice";

export function Learn() {
  const wordRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();
  const [selectedWord, setSelectedWord] = useState<WordOrPhrase>();
  const learn = useSelector((state: RootState) => selectLearn(state));
  const lists = useSelector((state: RootState) => selectAllWordLists(state));
  const whatToLearnListId = useSelector((state: RootState) => selectWhatToLearnListId(state));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const words = useSelector((state: RootState) => selectAllWordsAndPhrases(state));

  useEffect(() => {
    loadNextWord(whatToLearnListId || "");
  }, []);

  const randomiseList = (words: Array<WordOrPhrase | null | undefined>): WordOrPhrase[] => {
    return words.filter(w => !!w).sort(() => Math.random() - 0.5);
  }
  const randomisedChoices = randomiseList([learn?.wordToLearn, learn?.choice1, learn?.choice2]);

  const handleChoiceClick = (item: WordOrPhrase) => {
    setSelectedWord(item);
    if (item.id === learn?.wordToLearn?.id) {
      dispatch(setWordLearntAsCorrect());
    } else {
      dispatch(setWordLearntAsIncorrect());
    }
  }

  const showNextWord = () => {
    if (isLoading) {
      return;
    }

    if (learn?.wordToLearn) {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(addRecentlyLearntWord(learn.wordToLearn));
        loadNextWord(whatToLearnListId || "");

        setIsLoading(false);
      }, 100);
    }
  }

  const loadNextWord = (listId: string) => {
    const list = listId ? lists.find(l => l.id === listId) : null;
    const wordList = words?.filter(w => list?.items?.some(i => i.wordOrPhraseId === w.id));
    dispatch(setupWordToLearn(wordList ? wordList.map(w => w.id) : []));
    setSelectedWord(undefined);
    focusWord();
  }

  const focusWord = () => {
    setTimeout(() => {
      wordRef.current?.focus();
    }, 500);
  }

  const handleWhatToLearnListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const listId = e.target.value;
    dispatch(setWhatToLearnListId(listId));
    loadNextWord(listId);
  }

  const renderWhatToLearnSelection = (): React.ReactNode => {
    return (
      <div className="learn__selection">
        <label>Learn</label>
        <select defaultValue={whatToLearnListId} onChange={e => handleWhatToLearnListChange(e)}>
          <option value="">Everything</option>
          {lists.map((item, index) => (
            <option key={index} value={item.id}>{item.description}</option>
          ))}
        </select>
      </div>
    );
  }

  if (!learn?.wordToLearn) {
    return null;
  }

  if (selectedWord) {
    return (
      <div className="learn">
        {renderWhatToLearnSelection()}        
        <div className="learn__word">
          <h1 tabIndex={-1}>{learn?.wordToLearn?.value}</h1>
          <div className="learn__sounds-like">{learn?.wordToLearn?.soundsLike}</div>
        </div>
        {selectedWord.id === learn?.wordToLearn?.id ? (
          <div className="learn__feedback--correct">Correct!</div>
        ) : (
          <React.Fragment>
            <div className="learn__feedback--incorrect">Incorrect</div>
            <div>Meaning: {learn?.wordToLearn?.meaning}</div>
          </React.Fragment>
        )}
        <button className="learn__next-button" onClick={showNextWord} type="button">
          {isLoading ? <Spinner /> : "Next"}
        </button>
      </div>
    );
  }

  return (
    <div className="learn">
      {renderWhatToLearnSelection()}
      <div className="learn__word">
        <h1 ref={wordRef} tabIndex={-1}>{learn?.wordToLearn?.value}</h1>
        <div className="learn__sounds-like">{learn?.wordToLearn?.soundsLike}</div>
      </div>
      <div className="learn__choices">{randomisedChoices.map((item, index) => (
        <button key={index} onClick={() => handleChoiceClick(item)} type="button">{item.meaning}</button>
      ))}</div>
    </div>
  );
}