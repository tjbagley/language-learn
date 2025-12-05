import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectCategoryById } from "~/store/slices/categories.slice";
import { selectWordsByCategoryId, selectWordsBySearchQuery, setWordEditReturnRoute } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import { WordPhraseListView } from "../common/word-phrase/word-phrase-list-view";
import { SectionHeader } from "../common/section-header/section-header";

export interface CategoryViewProps {
  id?: string;
}

export function CategoryView(props: CategoryViewProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCategory = useSelector((state: RootState) => selectCategoryById(state, props.id));
  const words = useSelector((state: RootState) =>
    selectWordsByCategoryId(state, props.id)
  );

  const handleEditClick = (id: string) => {
    navigate(`/categories/${id}`);
  }

  const handleWordClick = (id: string) => {
    dispatch(setWordEditReturnRoute({ route: "/category-view", routeId: props.id }));
    navigate(`/words/${id}`);
  }

  if (!initialCategory?.id) {
    return null;
  }

  return (
    <React.Fragment>
      <SectionHeader heading={initialCategory?.description} buttonLabel="Edit" onButtonClick={() => handleEditClick(initialCategory.id)} />
      <ul>
        {words?.map((item, index) => (
          <li key={index} onClick={() => handleWordClick(item.id)}>
            <WordPhraseListView wordOrPhrase={item} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}