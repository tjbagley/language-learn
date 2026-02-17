import type { Route } from "../../+types/root";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { selectAllWordLists } from "~/store/slices/word-lists.slice";
import { SectionHeader } from "~/components/section-header/section-header";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lists" }, { name: "description", content: "" }];
}

export default function ListsPage() {
  const navigate = useNavigate();
  const lists = useSelector((state: RootState) => selectAllWordLists(state));

  const handleAddClick = () => {
    navigate("/lists/new");
  };

  const handleListClick = (id: string) => {
    navigate(`/list-view/${id}`);
  };

  return (
    <section className="centered-container">
      <SectionHeader
        heading="Lists"
        buttonLabel="Add"
        onButtonClick={handleAddClick}
      />
      <ul>
        {lists.map((item, index) => (
          <li key={index} onClick={() => handleListClick(item.id)}>
            {item.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
