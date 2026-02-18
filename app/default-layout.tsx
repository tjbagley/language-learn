import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import type { RootState } from "./store/store";
import { selectAllCategories } from "./store/slices/categories.slice";
import { selectAllWordsAndPhrases, selectRecentlyLearntWordsAndPhrases } from "./store/slices/words-phrases.slice";
import { selectAllWordLists } from "./store/slices/word-lists.slice";
import { ExportHelper } from "./helpers/export.helper";

import bookIcon from "./assets/book-outline.svg";
import listIcon from "./assets/list-outline.svg";
import categoriesIcon from "./assets/albums-outline.svg";
import learnIcon from "./assets/star-outline.svg";

function DefaultLayout() {
  const categories = useSelector((state: RootState) => selectAllCategories(state));
  const words = useSelector((state: RootState) => selectAllWordsAndPhrases(state));
  const lists = useSelector((state: RootState) => selectAllWordLists(state));
  const recentlyLearntWordsAndPhrases = useSelector((state: RootState) => selectRecentlyLearntWordsAndPhrases(state));
  const whatToLearnListId = useSelector((state: RootState) => state.wordsAndPhrases.whatToLearnListId);

  const handleExport = () => {
    ExportHelper.export(words, categories, lists, recentlyLearntWordsAndPhrases, whatToLearnListId);
  };

  const renderNav = (isFooter = false): React.ReactNode => {
    return (
      <nav>
        <NavLink to="/words">
          <img src={bookIcon} alt="Words Icon" aria-hidden="true" />
          <span>{isFooter ? 'Words' : 'Words and Phrases'}</span>
        </NavLink>
        <NavLink to="/lists">
          <img src={listIcon} alt="Lists Icon" aria-hidden="true" />
          <span>Lists</span>
        </NavLink>
        <NavLink to="/categories">
          <img src={categoriesIcon} alt="Categories Icon" aria-hidden="true" />
          <span>Categories</span>
        </NavLink>
        <NavLink to="/learn">
          <img src={learnIcon} alt="Learn Icon" aria-hidden="true" />
          <span>Learn</span>
        </NavLink>
        <button onClick={handleExport} type="button">Export</button>
      </nav>
    );
  }

  return (
    <div>
      <header>
        <nav>
          {renderNav()}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {renderNav(true)}
      </footer>
    </div>
  );
}

export default DefaultLayout;