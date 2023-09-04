"use client";
import React, { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Replace this fetch URL with your actual data URL
    fetch("/public/assets/data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => openModal(product)}
          >
            <img
              className="rounded-lg w-full h-32 object-cover mb-2"
              src={product.image}
              alt={product.name}
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
            <button className="text-right w-full" onClick={closeModal}>
              Close
            </button>
            <div className="flex">
              <div className="w-1/2">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
                </div>
                <img
                  className="rounded-lg w-full h-32 md:h-40 lg:h-48 object-cover mb-4"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
                <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                  {selectedProduct.description}
                </div>
              </div>
              <div className="border-l-2 border-gray-300 mx-4 h-full"></div>
              <div className="w-1/2 pl-4">
                <div className="mb-4 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Nutritional Facts</h3>
                  <ul className="list-disc list-inside my-2">
                    {Object.keys(selectedProduct.nutritional_facts).map((key, index) => (
                      <li key={index} className="text-gray-600">
                        {key}: {selectedProduct.nutritional_facts[key]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Benefits</h3>
                  <div className="text-gray-700 my-4">
                    {selectedProduct.benefits}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
