import { CategoryList } from "~/components/categories/category-list";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories" },
    { name: "description", content: "" },
  ];
}

export default function CategoriesPage() {
  return (
    <section className="centered-container">
      <CategoryList />
    </section>
  );
}
