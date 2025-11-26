import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectCategoryById } from "~/store/slices/categories.slice";
import { selectWordsByCategoryId, selectWordsBySearchQuery } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import { WordPhraseListView } from "../common/word-phrase/word-phrase-list-view";

export interface CategoryViewProps {
  id?: string;
}

export function CategoryView(props: CategoryViewProps) {
  const navigate = useNavigate();
  const initialCategory = useSelector((state: RootState) => selectCategoryById(state, props.id));
  const words = useSelector((state: RootState) =>
    selectWordsByCategoryId(state, props.id)
  );

  const handleEditClick = (id: string) => {
    navigate(`/categories/${id}`);
  }

  if (!initialCategory?.id) {
    return null;
  }

  return (
    <React.Fragment>    
      <div className="list-header">
        <h1>{initialCategory?.description}</h1>
        <button onClick={() => handleEditClick(initialCategory.id)}>Edit</button>
      </div>    
      <ul className="list--no-row-click">
        {words?.map((item, index) => (
          <li key={index}>
            <WordPhraseListView wordOrPhrase={item} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}