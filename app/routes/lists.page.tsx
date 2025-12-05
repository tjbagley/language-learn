import { WordLists } from "~/components/lists/word-lists";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lists" },
    { name: "description", content: "" },
  ];
}

export default function ListsPage() {
  return (
    <section className="centered-container">
      <WordLists />
    </section>
  );
}
