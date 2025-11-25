import { useParams } from "react-router";
import type { Route } from "./+types/home";
import { WordListView } from "~/components/lists/word-list-view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "List View" },
    { name: "description", content: "" },
  ];
}

export default function ListView() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      {id && <WordListView id={id} />}
    </section>
  );
}
