import type { Route } from "../+types/root";
import { useParams } from "react-router";
import { CategoryView } from "~/components/categories/category-view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category View" },
    { name: "description", content: "" },
  ];
}

export default function CategoryViewPage() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      <CategoryView id={id} />
    </section>
  );
}