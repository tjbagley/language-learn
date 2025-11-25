import { WordListForm } from "~/components/lists/word-list-form";
import type { Route } from "./+types/home";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "List" },
    { name: "description", content: "" },
  ];
}

export default function WordList() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      <WordListForm id={id} />
    </section>
  );
}