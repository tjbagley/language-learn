import { WordLists } from "~/components/lists/word-lists";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lists" },
    { name: "description", content: "" },
  ];
}

export default function Lists() {
  return (
    <section className="centered-container">
      <WordLists />
    </section>
  );
}
