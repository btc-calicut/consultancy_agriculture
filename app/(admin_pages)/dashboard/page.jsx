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
        console.log(newSelectedProducts);
        console.log(product);
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

  const isProductSeleced = (prod) => {
    console.log(selectedProducts);
    return selectedProducts.some(
      (item) => JSON.stringify(item) === JSON.stringify(prod)
    );
  };

  const products = [
    {
      name: "Tender Coconut",
      description:
        "Young, fresh and healthy tender coconuts are a pure, tasty and nutritious energy drink that keeps body hydrated round the clock.\nTender coconut is the most refreshing drink and best to quench your thirst in the summer.Tender coconut has antioxidant properties which help to protect the body from free radicals.It helps to lower blood pressure level, prevent kidney stone, and support heart health.",
      nutritional_facts: {
        "One cup (240 ml) contains": "46 calories",
        Carbohydrates: "9 grams",
        Fibre: "3 grams",
        Protein: "2 grams",
        "Vitamin C": "10% of the RDI",
        Magnesium: "15% of the RDI",
        Manganese: "17% of the RDI",
        Potassium: "17% of the RDI",
        Sodium: "11% of the RDI",
        Calcium: "6% of the RDI",
      },
      benefits:
        "Coconuts are a source of quick energy and refreshment. They improve digestion and immune system health.\nThey also prevent heart diseases by increasing good cholesterol and protect cells from cancer and ageing as they contain Cytokinin.",
      image: "/images/pict1.png",
    },
    {
      name: "Tomato",
      description: "Fresh and juicy tomatoes...",
      nutritional_facts: {
        "One cup contains": "18 calories",
        Carbohydrates: "4 grams",
        Fibre: "1 gram",
        Protein: "1 gram",
        "Vitamin C": "28% of the RDI",
        "Vitamin A": "20% of the RDI",
      },
      benefits: "Rich in antioxidants...",
      image: "/images/pict2.jpg",
    },
    {
      name: "Coconut",
      description: "Whole mature coconuts...",
      nutritional_facts: {
        "One cup contains": "283 calories",
        Carbohydrates: "12 grams",
        Fibre: "7 grams",
        Protein: "3 grams",
        "Saturated Fat": "24 grams",
        "Vitamin B6": "5% of the RDI",
      },
      benefits: "Rich in healthy fats...",
      image: "/images/pict3.png",
    },
    {
      name: "Potato",
      description: "Starchy, tuberous crop...",
      nutritional_facts: {
        "One cup contains": "116 calories",
        Carbohydrates: "26 grams",
        Fibre: "3 grams",
        Protein: "3 grams",
        "Vitamin C": "37% of the RDI",
        Potassium: "25% of the RDI",
      },
      benefits: "Rich in fiber...",
      image: "/images/pict4.png",
    },
  ];

  return (
    <section className="min-h-screen bg-zinc-100">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All products
        </h1>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((prod) => (
          <div
            onClick={() => openModal(prod)}
            className={` ${
              isProductSeleced(prod) ? `bg-blue-500` : `bg-white`
            } shadow-lg p-4 rounded-lg overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-xl`}
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
                    {Object.keys(productDetails.nutritional_facts).map(
                      (key, index) => (
                        <li key={index} className="text-gray-600">
                          {key}: {productDetails.nutritional_facts[key]}
                        </li>
                      )
                    )}
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
