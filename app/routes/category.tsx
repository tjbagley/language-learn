import type { Route } from "./+types/home";
import { useParams } from "react-router";
import { CategoryForm } from "~/components/categories/category-form";

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
      <CategoryForm id={id} />
    </section>
  );
}