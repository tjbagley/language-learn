import "./search.scss";

import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { search, selectSearchQuery, selectWordsBySearchQuery, setWordEditReturnRoute } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import { WordPhraseListView } from "../common/word-phrase/word-phrase-list-view";

export interface SearchProps {
  addClick?: (wordOrPhraseId: string) => void;
}

export function Search(props: SearchProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchTerm = useSelector((state: RootState) => selectSearchQuery(state));
    const searchedWordsAndPhrases = useSelector((state: RootState) =>
      selectWordsBySearchQuery(state)
    );
    const embeddedSearch = !!props.addClick;
    let searchTimeout: any = null;
    const placeholderText = embeddedSearch ? "Search for word or phrase to add to list" : "Search for word or phrase";
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        dispatch(search(event.target.value));
      }, 300);    
    };

    const handleAddClick = () => {    
      navigate("/words/new");   
    }

    const handleEmbeddedSearchAddClick = (id: string) => {
      if (props.addClick) {
        props.addClick(id);
        clearSearchInput();
      }
    }

    const handleWordClick = (id: string) => {
      dispatch(setWordEditReturnRoute({ route: "/words" }));
      navigate(`/words/${id}`);
    }

    const clearSearchInput = () => {
      if (searchInputRef?.current) {
        searchInputRef.current.value = '';
      }
      dispatch(search(""));
    }

    function renderItemsDefault(): React.ReactNode {
      return searchedWordsAndPhrases.map((item, index) => (
        <li key={index} onClick={() => handleWordClick(item.id)} data-testid={`search-item-${index}`}>
          <WordPhraseListView wordOrPhrase={item} />
        </li>
      ));
    }

    function renderEmbeddedSearchItems(): React.ReactNode {
      if (!searchTerm) {
        return null;
      }
      return searchedWordsAndPhrases.map((item, index) => (
        <li key={index} data-testid={`search-item-${index}`}><div><span>{item.value}</span>&nbsp;-&nbsp;<span className="search__item-meaning">{item.meaning}</span></div><input type="button" value="Add" onClick={() => handleEmbeddedSearchAddClick(item.id)} /></li>
      ));
    }

    return (
      <div className={`search ${embeddedSearch ? 'search--embedded' : ''}`}>
        <div className="search__controls">
          <div className="search__field-wrapper">
            <input ref={searchInputRef} className="search__field" type="text" placeholder={placeholderText} defaultValue={searchTerm} onChange={handleChange} />
            {searchTerm && <button className="search__clear-btn" onClick={clearSearchInput} type="button">×</button>}
          </div>
          {!embeddedSearch && <button onClick={handleAddClick} type="button">Add</button>}
        </div>
        <ul className={`${embeddedSearch ? 'list--no-row-click' : ''}`}>
          {!embeddedSearch && renderItemsDefault()}
          {embeddedSearch && renderEmbeddedSearchItems()}
        </ul>
      </div>
    )
  }