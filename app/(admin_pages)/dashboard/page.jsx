"use client";

import { useState, useEffect } from "react";
import { Modal, FloatButton } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getproducts", {
        method: "GET",
      });
      const data = await response.json();
      setProducts(data.info);
      if (response.status === 401) {
        message.error("Products not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (product) => {
    if (!isSelected) {
      const isMobile = window.innerWidth <= 796;

      if (isMobile) {
        router.push("/dashboard/" + product.name);
      } else {
        setProductDetails(product);
        setIsModalOpen(true);
      }
    } else {
      const isProductInList = selectedProducts.some(
        (item) => item.name === product.name
      );
      if (isProductInList) {
        const newSelectedProducts = selectedProducts.filter(
          (item) => item.name !== product.name
        );
        setSelectedProducts(newSelectedProducts);
      } else {
        const newSelectedProducts = [...selectedProducts, product];
        setSelectedProducts(newSelectedProducts);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectClick = () => {
    if (isSelected) {
      setSelectedProducts([]);
    }
    setIsSelected(!isSelected);
  };

  const isProductSelected = (prod) => {
    return selectedProducts.some(
      (item) => JSON.stringify(item) === JSON.stringify(prod)
    );
  };

  return (
    <section className="min-h-screen bg-zinc-100">
      <div className="p-4 px-6 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h1>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((prod) => (
            <div
              key={prod.name}
              onClick={() => openModal(prod)}
              className={`${
                isProductSelected(prod) ? "bg-blue-300" : "bg-white"
              } shadow-lg p-4 rounded-lg overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer`}
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{prod.name}</h2>
              </div>
            </div>
          ))}
      </div>
      <div>
        {productDetails && (
          <Modal
            title={
              <h2 className="text-2xl font-semibold">{productDetails.name}</h2>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width="70vw"
          >
            <div className="p-4 max-xs:p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <img
                  className="rounded-lg w-full h-48 object-cover mb-6"
                  src={productDetails.imageUrl}
                  alt={productDetails.name}
                />
                <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                  {productDetails.description}
                </div>
              </div>
              <div>
                <div className="mb-6 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg mb-4 font-semibold">
                    Nutritional Facts
                  </h3>
                  <ul className="list-disc list-inside my-2">
                    {productDetails.nutritional_facts.map((fact, index) => (
                      <li key={index} className="text-gray-600">
                        {fact.nutrient}: {fact.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
                  <div className="text-gray-700">{productDetails.benefits}</div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <FloatButton
        icon={<CheckCircleOutlined />}
        type={isSelected ? "primary" : "default"}
        onClick={onSelectClick}
        style={{ right: 24 }}
      />
      <FloatButton
        icon={<DeleteOutlined />}
        style={{ right: 94, visibility: isSelected ? "visible" : "hidden" }}
      />
    </section>
  );
};

export default Dashboard;
