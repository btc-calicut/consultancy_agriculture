"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const pathname = usePathname();
  const productName = pathname.replace("/products/", "").replace("%20", " ");

  useEffect(() => {
    // Replace this fetch URL with your actual data URL
    fetch("/assets/data.json")
      .then((response) => response.json())
      .then((data) =>
        setProducts(data.products.find((item) => item.name === productName))
      );
  }, []);

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
      {products && (
        <div className="px-4">
          <h2 className="text-2xl font-semibold my-6">{products.name}</h2>
          <div className="mb-6 text-gray-700 bg-gray-100 rounded-lg">
            <img
              className="rounded-lg w-full h-48 object-cover mb-2"
              src={products.image}
              alt={products.name}
            />
            <div className="p-4">{products.description}</div>
          </div>
          <div className="mb-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg mb-4 font-semibold">Nutritional Facts</h3>
            <ul className="list-disc list-inside my-2">
              {products.nutritional_facts &&
                products.nutritional_facts.map((key, index) => (
                  <li key={index} className="text-gray-600">
                    {key.nutrients}: {key.quantity}
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
            <p className="text-gray-700 text-md">{products.benefits}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
