import { Learn } from "~/components/learn/learn";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Words and Phrases" },
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
