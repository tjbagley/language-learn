import type { Route } from "./+types/home";
import { useParams } from "react-router";
import { CategoryView } from "~/components/categories/category-view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category" },
    { name: "description", content: "" },
  ];
}

export default function Category() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      <CategoryView id={id} />
    </section>
  );
}