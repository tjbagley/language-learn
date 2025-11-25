import type { Route } from "./+types/home";
import { Search } from "../components/search/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Words and Phrases" },
    { name: "description", content: "" },
  ];
}

export default function Words() {
  return (
    <section className="centered-container">
      <Search />
    </section>
  );
}
