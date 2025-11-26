import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import type { RootState } from "./store/store";
import { selectAllCategories } from "./store/slices/categories.slice";
import { selectAllWordsAndPhrases, selectRecentlyLearntWordsAndPhrases } from "./store/slices/words-phrases.slice";
import { selectAllWordLists } from "./store/slices/word-lists.slice";
import { ExportHelper } from "./helpers/export.helper";

function DefaultLayout() {
  const categories = useSelector((state: RootState) => selectAllCategories(state));
  const words = useSelector((state: RootState) => selectAllWordsAndPhrases(state));
  const lists = useSelector((state: RootState) => selectAllWordLists(state));
  const recentlyLearntWordsAndPhrases = useSelector((state: RootState) => selectRecentlyLearntWordsAndPhrases(state));

  const handleExport = () => {
    ExportHelper.export(words, categories, lists, recentlyLearntWordsAndPhrases);
  };

  return (
    <div>
      <header>
        <nav>
            <NavLink to="/words">Words and Phrases</NavLink>
            <NavLink to="/lists">Lists</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/learn">Learn</NavLink>
            <button onClick={handleExport}>Export</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;