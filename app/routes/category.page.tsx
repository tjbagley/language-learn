import type { Route } from "../+types/root";
import { useParams } from "react-router";
import { CategoryForm } from "~/components/categories/category-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category" },
    { name: "description", content: "" },
  ];
}

export default function CategoryPage() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      <CategoryForm id={id} />
    </section>
  );
}