"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";
import Link from "next/link";

const ProductsPage = () => {
  const [product, setProduct] = useState(null);

  const pathname = usePathname();
  const productName = pathname.replace("/products/", "").replace("%20", " ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/getproducts`, {
        method: "POST",
        body: JSON.stringify(productName),
      });
      const data = await response.json();
      setProduct(data.info);
      if (response.status === 401) {
        message.error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full px-4 py-6">
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/products">Products</Link>,
          },
          {
            title: productName,
          },
        ]}
      />
      {product && (
        <div className="px-4">
          <h2 className="text-2xl font-semibold my-6">{product.name}</h2>
          <div className="mb-6 text-gray-700 bg-gray-100 rounded-lg">
            <img
              className="rounded-lg w-full h-48 object-cover mb-2"
              src={product.imageUrl}
              alt={product.name}
            />
            <div className="p-4">{product.description}</div>
          </div>
          <div className="mb-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg mb-4 font-semibold">Nutritional Facts</h3>
            <ul className="list-disc list-inside my-2">
              {product.nutritional_facts &&
                product.nutritional_facts.map((key, index) => (
                  <li key={index} className="text-gray-600">
                    {key.nutrient}: {key.quantity}
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
            <p className="text-gray-700 text-md">{product.benefits}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
