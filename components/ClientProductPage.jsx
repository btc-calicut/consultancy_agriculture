"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal, Breadcrumb, Drawer } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProductCard from "@components/ProductCard";

const ClientProductPage = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange); // This code sets up an event listener for the "resize" event on the window object when the component mounts (i.e., when we load admin page)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange); // This code removes the event listener when the component unmounts (i.e., when we exit the admin page)
    };
  }, []);

  function handleWindowSizeChange() {
    // this if condition determines whether it is mobile view
    if (window.innerWidth < 500) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    if (mobileView) {
      setOverlay(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-28 my-6">
        <Breadcrumb
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "Products",
            },
          ]}
        />
        <div className="mt-4 bg-zinc-100 py-3 rounded-md min-h-screen">
          <h1 className="px-5 py-2 mb-4 text-[#0b0924] font-semibold text-[27px] md:text-[30px] leading-normal w-full">
            Our Products
          </h1>
          <div className="px-5 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && mobileView && (
        <Drawer
          title={
            <h2 className="text-2xl font-semibold font-poppins">
              {selectedProduct.name}
            </h2>
          }
          placement="bottom"
          closable={true}
          onClose={() => setOverlay(false)}
          open={overlay}
          closeIcon={<DownOutlined />}
          height="85vh"
          headerStyle={{ textAlign: "center" }}
          className="rounded-3xl"
        >
          <div className="w-full flex flex-col space-y-2">
            <div className="text-gray-700 bg-gray-100 rounded-lg">
              <div className="h-48 relative w-full mb-2">
                <Image
                  className="object-cover rounded-lg"
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  fill
                  loading="lazy"
                  sizes="100vw"
                />
              </div>
              <div className="p-4">{selectedProduct.description}</div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg mb-4 font-semibold">Nutritional Facts</h3>
              <ul className="list-disc list-inside my-2">
                {selectedProduct.nutritional_facts &&
                  selectedProduct.nutritional_facts.map((key, index) => (
                    <li key={index} className="text-gray-700">
                      {key.nutrient}: {key.quantity}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
              <p className="text-gray-700 text-md">
                {selectedProduct.benefits}
              </p>
            </div>
          </div>
        </Drawer>
      )}

      {selectedProduct && !mobileView && (
        <Modal
          title={
            <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
          }
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width="70vw"
        >
          <div className="grid grid-cols-2">
            <div className="p-4 space-y-4">
              <div className="h-48 relative w-full">
                <Image
                  className="object-cover rounded-lg"
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  fill
                  loading="lazy"
                  sizes="100vw"
                />
              </div>
              <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                {selectedProduct.description}
              </div>
            </div>
            <div className="p-4">
              <div className="mb-6 bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg mb-4 font-semibold">
                  Nutritional Facts
                </h3>
                <ul className="list-disc list-inside my-2">
                  {selectedProduct.nutritional_facts.map((key, index) => (
                    <li key={index} className="text-gray-600">
                      {key.nutrient}: {key.quantity}
                    </li>
                  ))}
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

export default ClientProductPage;
