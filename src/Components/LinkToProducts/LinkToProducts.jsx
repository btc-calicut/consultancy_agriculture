import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LinkToProducts = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };
  return (
    <div className="flex flex-col items-center justify-center h-20 mx-10 bg-yellow-100">
      <h1>Link will take to products page</h1>
      <button className="border border-black" onClick={handleNavigate}>
        Click me
      </button>
    </div>
  );
};

export default LinkToProducts;
