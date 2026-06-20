import { Route, Routes } from 'react-router-dom';

import { Home, UserDetails, RepositoryDetails, NotFound } from '../pages';
import { Layout } from '../components/Layout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserDetails />} />
        <Route path="/repo/:owner/:repo" element={<RepositoryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}