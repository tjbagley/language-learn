import "./learn.scss";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { addRecentlyLearntWord, selectLearn, setupWordToLearn, setWordLearntAsCorrect, setWordLearntAsIncorrect } from "~/store/slices/words-phrases.slice";
import type { WordOrPhrase } from "~/models/word-or-phrase";
import React, { useEffect, useState } from "react";

export function Learn() {
  const dispatch = useDispatch();
  const [selectedWord, setSelectedWord] = useState<WordOrPhrase>();
  const learn = useSelector((state: RootState) =>
    selectLearn(state)
  );

  useEffect(() => {
    dispatch(setupWordToLearn());
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
    if (learn?.wordToLearn) {
      dispatch(addRecentlyLearntWord(learn.wordToLearn));
      dispatch(setupWordToLearn());
      
      setSelectedWord(undefined);
    }
  }

  if (!learn?.wordToLearn) {
    return null;
  }

  if (selectedWord) {
    return (
      <div className="learn">
        <div className="learn__word">
          <div>{learn?.wordToLearn?.value}</div>
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
        <button className="learn__next-button" onClick={showNextWord}>Next</button>
      </div>
    );
  }

  return (
    <div className="learn">
      <div className="learn__word">
        <div>{learn?.wordToLearn?.value}</div>
        <div className="learn__sounds-like">{learn?.wordToLearn?.soundsLike}</div>
      </div>
      <div className="learn__choices">{randomisedChoices.map((item, index) => (
        <button key={index} onClick={() => handleChoiceClick(item)}>{item.meaning}</button>
      ))}</div>
    </div>
  );
}