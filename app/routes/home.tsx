import type { Route } from "./+types/home";
import { Start } from "../components/start/start";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Language Learn" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Start />;
}
