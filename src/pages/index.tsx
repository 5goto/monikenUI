import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./main/Main";

const CollectionsPageLazy = lazy(() =>
  import("./collections/Collections").then((module) => ({
    default: module.Collections,
  }))
);
const RoutesPageLazy = lazy(() =>
  import("./routes/RoutesPage").then((module) => ({
    default: module.RoutesPage,
  }))
);
const NewRoutePageLazy = lazy(() =>
  import("./routes/NewRoute").then((module) => ({ default: module.NewRoute }))
);
const RouteDetailPageLazy = lazy(() =>
  import("./routes/RouteDetail").then((module) => ({
    default: module.RouteDetail,
  }))
);

export const Routing = () => {
  return (
    <Suspense fallback={<h1>Suspence page placeholder</h1>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="collections" element={<CollectionsPageLazy />} />
        <Route
          path="collections/:collectionName/routes"
          element={<RoutesPageLazy />}
        />
        <Route
          path="collections/:collectionName/routes/new"
          element={<NewRoutePageLazy />}
        />
        <Route
          path="collections/:collectionName/routes/:id"
          element={<RouteDetailPageLazy />}
        />
        <Route path="routes" element={<RoutesPageLazy />} />
      </Routes>
    </Suspense>
  );
};
