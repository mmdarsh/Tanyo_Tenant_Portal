import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import HomePage from '../layouts/HomePage';

const RouteList: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* Add your routes here following this pattern: */}
      {/* <Route path="/your-path" element={<YourComponent />} /> */}
      <Route path="/:tenantName/:category/:categoryId/:tenantId" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
};

export default RouteList;