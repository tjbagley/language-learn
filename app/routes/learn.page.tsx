import { Learn } from "~/components/learn/learn";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learn Words and Phrases" },
    { name: "description", content: "" },
  ];
}

export default function LearnPage() {
  return (
    <section className="centered-container">
      <Learn />
    </section>
  );
}
