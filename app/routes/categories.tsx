import { CategoryList } from "~/components/categories/category-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories" },
    { name: "description", content: "" },
  ];
}

export default function Words() {
  return (
    <section className="centered-container">
      <CategoryList />
    </section>
  );
}
