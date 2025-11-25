import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("./default-layout.tsx", [
        route("words", "./routes/words.tsx"),
        route("words/:id", "./routes/word.tsx"),
        route("lists", "./routes/lists.tsx"),
        route("lists/:id", "./routes/list.tsx"),
        route("list-view/:id", "./routes/list-view.tsx"),
        route("categories", "./routes/categories.tsx"),
        route("categories/:id", "./routes/category.tsx"),
        route("learn", "./routes/learn.tsx")
    ])
] satisfies RouteConfig;
