import { Route, Routes } from 'react-router-dom';
import { Main } from './main/Main';
import { Collections } from './collections/Collections';
import { RoutesPage } from './routes/RoutesPage';
import { NewRoute } from './routes/NewRoute';
import { RouteDetail } from './routes/RouteDetail';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="collections" element={<Collections />} />
      <Route
        path="collections/:collectionName/routes"
        element={<RoutesPage />}></Route>
      <Route
        path="collections/:collectionName/routes/new"
        element={<NewRoute />}
      />
      <Route
        path="collections/:collectionName/routes/:id"
        element={<RouteDetail />}
      />
    </Routes>
  );
};
