import type { Route } from "../+types/root";
import { Search } from "../components/search/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Words and Phrases" },
    { name: "description", content: "" },
  ];
}

export default function WordsPage() {
  return (
    <section className="centered-container">
      <Search />
    </section>
  );
}
