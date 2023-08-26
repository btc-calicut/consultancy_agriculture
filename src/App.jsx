import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Products from "./pages/Products/Products";
import Error404 from "./pages/Error404/Error404";

const App = () => {
  return (
    <div className="bg-white w-full min-h-screen overflow-hidden">
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
