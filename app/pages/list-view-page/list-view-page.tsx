import "./list-view-page.scss";
import { useNavigate, useParams } from "react-router";
import type { Route } from "../../+types/root";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { selectWordListById } from "~/store/slices/word-lists.slice";
import {
  selectAllWordsAndPhrases,
  setWordEditReturnRoute,
} from "~/store/slices/words-phrases.slice";
import type { WordOrPhrase } from "~/models/word-or-phrase";
import { SectionHeader } from "~/components/section-header/section-header";
import { WordPhraseListView } from "~/components/word-phrase/word-phrase-list-view";

export function meta({}: Route.MetaArgs) {
  return [{ title: "List View" }, { name: "description", content: "" }];
}

export default function ListViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wordList = useSelector((state: RootState) =>
    selectWordListById(state, id),
  );
  const words = useSelector((state: RootState) =>
    selectAllWordsAndPhrases(state),
  );

  const handleViewClick = () => {
    navigate(`/lists/${id}`);
  };

  const handleWordClick = (wordId: string) => {
    dispatch(setWordEditReturnRoute({ route: "/list-view", routeId: id }));
    navigate(`/words/${wordId}`);
  };

  const getWordOrPhraseDisplay = (wordOrPhraseId: string): WordOrPhrase => {
    return (
      words.find((wp) => wp.id === wordOrPhraseId) || {
        id: "",
        value: "",
        soundsLike: "",
        meaning: "",
        categories: [],
      }
    );
  };

  return (
    <section className="centered-container">
      <SectionHeader
        heading={wordList?.description}
        buttonLabel="Edit"
        onButtonClick={() => handleViewClick()}
      />
      <ul className="word-list-view__items">
        {wordList?.items.map((item, index) => (
          <li key={index} onClick={() => handleWordClick(item.wordOrPhraseId)}>
            {item.actor && (
              <span className="word-list-view__actor">{item.actor}</span>
            )}
            <WordPhraseListView
              wordOrPhrase={getWordOrPhraseDisplay(item.wordOrPhraseId)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
