import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.page.tsx"),
    layout("./default-layout.tsx", [
        route("words", "./routes/words.page.tsx"),
        route("words/:id", "./routes/word.page.tsx"),
        route("lists", "./routes/lists.page.tsx"),
        route("lists/:id", "./routes/list.page.tsx"),
        route("list-view/:id", "./routes/list-view.page.tsx"),
        route("categories", "./routes/categories.page.tsx"),
        route("categories/:id", "./routes/category.page.tsx"),
        route("category-view/:id", "./routes/category-view.page.tsx"),
        route("learn", "./routes/learn.page.tsx")
    ])
] satisfies RouteConfig;
