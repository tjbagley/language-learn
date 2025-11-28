import "./learn.scss";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { addRecentlyLearntWord, selectLearn, setupWordToLearn, setWordLearntAsCorrect, setWordLearntAsIncorrect } from "~/store/slices/words-phrases.slice";
import type { WordOrPhrase } from "~/models/word-or-phrase";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../common/spinner/spinner";
import { set } from "react-hook-form";

export function Learn() {
  const wordRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [selectedWord, setSelectedWord] = useState<WordOrPhrase>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const learn = useSelector((state: RootState) =>
    selectLearn(state)
  );

  useEffect(() => {
    dispatch(setupWordToLearn());
    focusWord();
  }, [dispatch]);

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
        dispatch(setupWordToLearn());
        
        setSelectedWord(undefined);

        focusWord();

        setIsLoading(false);
      }, 250);
    }
  }

  const focusWord = () => {
    setTimeout(() => {
      wordRef.current?.focus();
    }, 500);
  }

  if (!learn?.wordToLearn) {
    return null;
  }

  if (selectedWord) {
    return (
      <div className="learn">
        <div className="learn__word">
          <div tabIndex={-1}>{learn?.wordToLearn?.value}</div>
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
      <div className="learn__word">
        <div ref={wordRef} tabIndex={-1}>{learn?.wordToLearn?.value}</div>
        <div className="learn__sounds-like">{learn?.wordToLearn?.soundsLike}</div>
      </div>
      <div className="learn__choices">{randomisedChoices.map((item, index) => (
        <button key={index} onClick={() => handleChoiceClick(item)} type="button">{item.meaning}</button>
      ))}</div>
    </div>
  );
}