import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("pages/home-page/home-page.tsx"),
    layout("./default-layout.tsx", [
        route("words/:id", "./pages/word-page/word-page.tsx"),
        route("lists", "./pages/lists-page/lists-page.tsx"),
        route("lists/:id", "./pages/list-page/list-page.tsx"),
        route("list-view/:id", "./pages/list-view-page/list-view-page.tsx"),
        route("categories", "./pages/categories-page/categories-page.tsx"),
        route("categories/:id", "./pages/category-page/category-page.tsx"),
        route("category-view/:id", "./pages/category-view-page/category-view-page.tsx"),
        route("learn", "./pages/learn-page/learn-page.tsx"),
        route("*", "./pages/words-page/words-page.tsx")
    ])
] satisfies RouteConfig;
