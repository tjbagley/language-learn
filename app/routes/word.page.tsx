import type { Route } from "../+types/root";
import { useParams } from "react-router";
import { WordForm } from "~/components/word-form/word-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Word or Phrase" },
    { name: "description", content: "" },
  ];
}

export default function WordPage() {
  const { id } = useParams();

  return (
    <section className="centered-container">
      <WordForm id={id} />
    </section>
  );
}