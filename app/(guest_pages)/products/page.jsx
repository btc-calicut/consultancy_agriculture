"use client";

import Breadcrumb from "@components/Breadcrumb";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Replace this fetch URL with your actual data URL
    fetch("/assets/data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const openModal = (product) => {
    const isMobile = window.innerWidth <= 480;

    if (isMobile) {
      router.push("/products/" + product.name);
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-36 my-6">
        <Breadcrumb />
        <div className="bg-zinc-100 py-3">
          <h1 className="px-5 py-2 mb-4 text-[#0b0924] font-semibold text-[27px] xs:text-[30px] leading-normal w-full">
            Our Products
          </h1>
          <div className="px-5 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 xs:gap-4 text-center">
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
        </div>
      </div>
      {selectedProduct && (
        <Modal
          title={
            <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
          }
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width="70vw"
        >
          <div className="grid grid-cols-2 ">
            <div className="p-4">
              <img
                className="rounded-lg w-full h-48 object-cover mb-6"
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
              <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                {selectedProduct.description}
              </div>
            </div>
            <div className=" p-4">
              <div className="mb-6 bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg mb-4 font-semibold">
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
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
                <div className="text-gray-700">{selectedProduct.benefits}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProductsPage;
