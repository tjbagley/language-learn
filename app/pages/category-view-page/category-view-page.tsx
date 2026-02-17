import { useDispatch, useSelector } from "react-redux";
import type { Route } from "../../+types/root";
import { useNavigate, useParams } from "react-router";
import type { RootState } from "~/store/store";
import { selectCategoryById } from "~/store/slices/categories.slice";
import {
  selectWordsByCategoryId,
  setWordEditReturnRoute,
} from "~/store/slices/words-phrases.slice";
import { SectionHeader } from "~/components/section-header/section-header";
import { WordPhraseListView } from "~/components/word-phrase/word-phrase-list-view";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Category View" }, { name: "description", content: "" }];
}

export default function CategoryViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCategory = useSelector((state: RootState) =>
    selectCategoryById(state, id),
  );
  const words = useSelector((state: RootState) =>
    selectWordsByCategoryId(state, id),
  );

  const handleEditClick = () => {
    navigate(`/categories/${id}`);
  };

  const handleWordClick = (wordId: string) => {
    dispatch(setWordEditReturnRoute({ route: "/category-view", routeId: id }));
    navigate(`/words/${wordId}`);
  };

  if (!initialCategory?.id) {
    return null;
  }

  return (
    <section className="centered-container">
      <SectionHeader
        heading={initialCategory?.description}
        buttonLabel="Edit"
        onButtonClick={() => handleEditClick()}
      />
      <ul>
        {words?.map((item, index) => (
          <li key={index} onClick={() => handleWordClick(item.id)}>
            <WordPhraseListView wordOrPhrase={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
