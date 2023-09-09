"use client";

import Breadcrumb from "@components/Breadcrumb";
import { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Replace this fetch URL with your actual data URL
    fetch("/assets/data.json")
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
    <section className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-36 my-6">
        <Breadcrumb />
        <div className="bg-zinc-100 py-3">
          <h1 className="px-5 py-2 mb-4 text-[#0b0924] font-semibold text-[27px] xs:text-[30px] leading-normal w-full">
            Our Products
          </h1>
          <div className="px-5 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 xs:gap-4">
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white p-8 rounded-lg h-3/4 w-3/4 overflow-y-auto">
                <button className="text-right w-full" onClick={closeModal}>
                  Close
                </button>
                <h2 className="text-2xl font-semibold text-center mt-4 mb-8">
                  {selectedProduct.name}
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 h-full">
                  <div className="pl-4">
                    <div className="mb-4">
                      <img
                        className="rounded-lg w-full h-32 md:h-40 lg:h-48 object-cover mb-4"
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                      />
                      <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                        {selectedProduct.description}
                      </div>
                    </div>
                  </div>
                  <div className=" pl-4">
                    <div className="mb-4 bg-gray-100 p-4 rounded-md">
                      <h3 className="text-lg font-semibold">
                        Nutritional Facts
                      </h3>
                      <ul className="list-disc list-inside my-2">
                        {Object.keys(selectedProduct.nutritional_facts).map(
                          (key, index) => (
                            <li key={index} className="text-gray-600">
                              {key}: {selectedProduct.nutritional_facts[key]}
                            </li>
                          )
                        )}
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
      </div>
    </section>
  );
};

export default ProductsPage;
