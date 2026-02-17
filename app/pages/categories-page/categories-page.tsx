import type { Route } from "../../+types/root";
import { SectionHeader } from "~/components/section-header/section-header";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { selectAllCategories } from "~/store/slices/categories.slice";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Categories" }, { name: "description", content: "" }];
}

export default function CategoriesPage() {
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state),
  );

  const handleAddClick = () => {
    navigate("/categories/new");
  };

  const handleCategoryClick = (id: string) => {
    navigate(`/category-view/${id}`);
  };

  return (
    <section className="centered-container">
      <SectionHeader
        heading="Categories"
        buttonLabel="Add"
        onButtonClick={handleAddClick}
      />
      <ul>
        {categories.map((item, index) => (
          <li key={index} onClick={() => handleCategoryClick(item.id)}>
            {item.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
