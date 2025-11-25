import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Words and Phrases" },
    { name: "description", content: "" },
  ];
}

export default function Learn() {
  return (
    <section className="centered-container">
      Coming soon...
    </section>
  );
}
