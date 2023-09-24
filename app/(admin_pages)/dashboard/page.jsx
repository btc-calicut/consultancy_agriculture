"use client";

import { useState } from "react";
import { Modal, FloatButton } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const openModal = (product) => {
    if (!isSelected) {
      setProductDetails(product);
      setIsModalOpen(true);
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

  const products = [
    {
      name: "Tender Coconut",
      description:
        "Young, fresh and healthy tender coconuts are a pure, tasty and nutritious energy drink that keeps body hydrated round the clock.\nTender coconut is the most refreshing drink and best to quench your thirst in the summer.Tender coconut has antioxidant properties which help to protect the body from free radicals.It helps to lower blood pressure level, prevent kidney stone, and support heart health.",
      nutritional_facts: [
        {
          nutrients: "One cup (240 ml) contains",
          quantity: "46 calories",
        },
        {
          nutrients: "Carbohydrates",
          quantity: "9 grams",
        },
        {
          nutrients: "Fibre",
          quantity: "3 grams",
        },
        {
          nutrients: "Protein",
          quantity: "2 grams",
        },
        {
          nutrients: "Vitamin C",
          quantity: "10% of the RDI",
        },
        {
          nutrients: "Magnesium",
          quantity: "15% of the RDI",
        },
        {
          nutrients: "Manganese",
          quantity: "17% of the RDI",
        },
        {
          nutrients: "Potassium",
          quantity: "17% of the RDI",
        },
        {
          nutrients: "Sodium",
          quantity: "11% of the RDI",
        },
        {
          nutrients: "Calcium",
          quantity: "6% of the RDI",
        },
      ],
      benefits:
        "Coconuts are a source of quick energy and refreshment. They improve digestion and immune system health.\nThey also prevent heart diseases by increasing good cholesterol and protect cells from cancer and aging as they contain Cytokinin.",
      image: "/images/pict1.png",
    },
    {
      name: "Tomato",
      description: "Fresh and juicy tomatoes...",
      nutritional_facts: [
        {
          nutrients: "One cup contains",
          quantity: "18 calories",
        },
        {
          nutrients: "Carbohydrates",
          quantity: "4 grams",
        },
        {
          nutrients: "Fibre",
          quantity: "1 gram",
        },
        {
          nutrients: "Protein",
          quantity: "1 gram",
        },
        {
          nutrients: "Vitamin C",
          quantity: "28% of the RDI",
        },
        {
          nutrients: "Vitamin A",
          quantity: "20% of the RDI",
        },
      ],
      benefits: "Rich in antioxidants...",
      image: "/images/pict2.jpg",
    },
    {
      name: "Coconut",
      description: "Whole mature coconuts...",
      nutritional_facts: [
        {
          nutrients: "One cup contains",
          quantity: "283 calories",
        },
        {
          nutrients: "Carbohydrates",
          quantity: "12 grams",
        },
        {
          nutrients: "Fibre",
          quantity: "7 grams",
        },
        {
          nutrients: "Protein",
          quantity: "3 grams",
        },
        {
          nutrients: "Saturated Fat",
          quantity: "24 grams",
        },
        {
          nutrients: "Vitamin B6",
          quantity: "5% of the RDI",
        },
      ],
      benefits: "Rich in healthy fats...",
      image: "/images/pict3.png",
    },
    {
      name: "Potato",
      description: "Starchy, tuberous crop...",
      nutritional_facts: [
        {
          nutrients: "One cup contains",
          quantity: "116 calories",
        },
        {
          nutrients: "Carbohydrates",
          quantity: "26 grams",
        },
        {
          nutrients: "Fibre",
          quantity: "3 grams",
        },
        {
          nutrients: "Protein",
          quantity: "3 grams",
        },
        {
          nutrients: "Vitamin C",
          quantity: "37% of the RDI",
        },
        {
          nutrients: "Potassium",
          quantity: "25% of the RDI",
        },
      ],
      benefits: "Rich in fiber...",
      image: "/images/pict4.png",
    },
  ];

  return (
    <section className="min-h-screen bg-zinc-100">
      <div className="p-4 px-6 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          All products
        </h1>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((prod) => (
          <div
            key={prod.name}
            onClick={() => openModal(prod)}
            className={`${
              isProductSelected(prod) ? "bg-blue-500" : "bg-white"
            } shadow-lg p-4 rounded-lg overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer`}
          >
            <img
              src={prod.image}
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
                  src={productDetails.image}
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
                        {fact.nutrients}: {fact.quantity}
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
